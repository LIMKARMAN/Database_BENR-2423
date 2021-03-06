//////////////////main function of facility//////////////////////
let users, facilities;

class Facility {
    static async injectDB(conn) {
		users = await conn.db("VMS").collection("users");
		facilities = await conn.db("VMS").collection("facilities");
	}

    // create facility
	static async createfacility(token,detail) {		
		return facilities.findOne({								 
				'user_id': token._id						// only can be used by user
		}).then(async facility =>{
			if (facility) 
			{
				return "facility creation fail"; 			// duplicate facility
			}
			else
			{
				await facilities.insertOne({	 			// Save the booking to database				
					'user_id' : token._id,
					'visitor_id' : detail.visitor_id, 		// insert by user
                    'security_id' : token.security_id,	
					'number_of_participants': detail.number_of_participants,
					'facility': detail.facility,
					'facility_access_permission': "no_access"
				})
				return "facility creation success";
			}
		})	
	}

    // view facility
	static async viewfacility(token) {					
		return facilities.findOne({								 
			$or : 
			[
				{ 'user_id': token._id },	
				{ 'visitor_id': token._id },
				{ 'security_id': token._id }
			]			
		}).then(async facility =>{
			if (facility) 
			{
				return facility; 					// return details
			}
			else
			{
				return "facility view fail"; 		// no details
			}
		})	
	}

    // update facility details
	static async updatefacilitydetail(token,detail) {		// token with update detail
		return facilities.findOne({								 
			'user_id': token._id					
		}).then(async facility =>{
			if (facility) 
			{
				await facilities.updateOne({'user_id' : facility.user_id},{ // update facility booking to database
					$set:{ 			 
						'number_of_participants': detail.number_of_participants,
						'facility': detail.facility
					}	 							
				})
				return "facility update success";
			}
			else
			{
				return "facility update fail"; 								// not target to update
			}
		})	
	}

	// update facility permission for admin
	static async updatefacilitypermission(detail) {			// token = with admin role	
		return facilities.findOne({									// detail = which visitor's permission is allowed
 			'user_id': detail.user_id				
		}).then(async facility =>{
			if (facility) 
			{
				await facilities.updateOne({'user_id' : facility.user_id},{ // update user to database
					$set:{
						'facility_access_permission' : facility.facility			 
					}	 							
				})
				return "facility permission update success";
			}
			else
			{
				return "facility permission update fail"; 				 
			}
		})	
	}

    // delete facility
	static async deletefacility(detail) {		
		return facilities.findOne({ 'user_id' : detail.user_id }).then(async facility =>{
			if (facility) 
			{
				await facilities.deleteOne({ 
					'_id': facility._id 
				});
				return "facility deletion success";
			}
			else
			{
				return "facility deletion fail"; 	 // nothing to delete 
			}
		})	
	}
}

module.exports = Facility;