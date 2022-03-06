exports.protect = async (req,res,next) => {
	if(!req.session.user) {
		return res.redirect('/login')
	}else {
		next()
	}
}

exports.authorize = (...roles) => {
	return (req,res,next) => {
		if(!roles.includes(req.session.user.role)) {
			return res.redirect('/error/500')
		}
		next()
	}
}