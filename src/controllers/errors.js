exports.error500 = async (req,res,next) => {
	try {
		res.render('errors/500')
	}catch(error) {
		console.log(error)
	}
}


exports.error404 = async (req,res,next) => {
	try {
		res.render('errors/404')
	}catch(error) {
		console.log(error)
	}
}