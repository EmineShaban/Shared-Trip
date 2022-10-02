const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const {getErrorMessage} = require('../utils/errorHelper')
const authServices = require('../services/authServices')

const { COOKIE_SESSION_NAME } = require('../constants')


router.get('/login', isGueat, (req, res) =>{
    res.render('auth/login');
})
router.post('/login', isGueat, async (req, res) =>{
    const {email, password} = req.body
   const user = await authServices.login(email, password)
   const token = await authServices.createToken(user)

   res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true})
    res.redirect('/')
});


router.get('/register', isGueat, (req, res) =>{
    res.render('auth/register')
})

router.post('/register', isGueat, async (req, res) =>{
    const { password, repeatPassword, ...userData} = req.body

    if (password !== repeatPassword) {
        return res.render('auth/register', {error: "Password missmatch!"})
    }


    try{
       const createdUser =  await authServices.create({...userData, password})
       const token = await authServices.createToken(createdUser)

       res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true})
        res.redirect('/')
    } catch (error){
        return res.render('auth/register', {error: getErrorMessage(error)})

    }

    
})
router.get('/logout', isAuth, (req, res) =>{
    res.clearCookie(COOKIE_SESSION_NAME)
    res.redirect('/')
})





module.exports = router