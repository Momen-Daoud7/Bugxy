const Attachment = require('../models/4-attachment');

module.exports = class AttachmentServices {
	// get all Attachments
	static async getAttachments() {
		try{
			const attachments = await Attachment.findAll();
			return attachments;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Attachment
	static async store(data) {
		try{
			const attachment = await Attachment.create(data);
			return attachment;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Attachment
	static async update(AttachmentId,data) {
		try{
			const oldAttachment = await Attachment.findByPk(AttachmentId)
			if(!oldAttachment) {
				return  false;
			}
			const updatedAttachment = await oldAttachment.update();			
			return updatedAttachment;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Attachment
	static async delete(AttachmentId) {
		try{
			const attachment = await Attachment.findByPk(AttachmentId);
			if(!attachment) {
				return false;
			}
			const deleted = await attachment.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Attachment
	static async getAttachment(AttachmentId) {
		try{
			const attachment = await Attachment.findByPk(AttachmentId);
			if(!attachment) {
				console.log('no Attachment with that id');
				return false;
			}
			return attachment;
		}catch(error) {
			console.log(error);
		}
	}

	
}