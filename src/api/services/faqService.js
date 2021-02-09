const cmsServiceClient = require("../clients/cmsServiceClient");
const jwtService = require ("../services/jwtService");

exports.getFaq = ( token, next ) => {
    
    try{
        if(token){
            jwtService.verifyToken( token, function( response ) {

                let faq = cmsServiceClient.getFaq( response.profile );
    
                if( faq ) {
                    return next( faq );
                } else {
                    throw Error( "NotFound" );
                }
            });
        } else {
            let faq = cmsServiceClient.getFaq( "DEFAULT" );
            
            return next( faq );
        }
        
    }catch(err){
        throw err;
    }
}