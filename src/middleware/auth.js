exports.protect = async (req,res,next) => {
	if(!req.session.user) {
		return res.redirect('/login')
	}else {
		next()
	}

}