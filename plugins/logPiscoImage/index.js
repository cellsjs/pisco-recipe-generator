'use strict';

function logPiscoImage() {
  this.logger.info('#yellow', `\n                                   
                                        &  &&%%%%%%%%%%%%%%%  
                                    /*  &                   
        .%&&&&                     &  &                     
     &&    &&/   %&(              &  &                      
   &&  .  &      &  &           &  .,                       
  &/,  #     &  (  & &%        &  &                         
 && #    & &  &    /  &       %  &                          
 & %     &&& &&,      &&&&&&&  &                            
 &/ & &&  &.&&  ..& &    &  &    &,                         
  & &   *  % * &      &&&&&&&&&&&   &                       
  ,&  /      (   &/ .&             ,                        
    && %.%&   & &  &&              &                        
      &&(.     &&&                 &                        
            &                      &                        
            &                      &                        
           (                        %                       
           &                        &                       
          &                          &                      
          &                          &                      
         ./         PISCOSOUR        ./                     
         &                            &                     
         &                            &                     
          (                          %.                     
          &                          &                      
           &                        %                       
            &&                    #&                        
              &&&              %%&                          
                (&&&&&&&&&&&&&%&                            
                   &        %.                              
                     &    %                                 
                     *    &                                 
                      ,                                     
                      &  *                                  
                      %  ,                                  
                                                            
                     &    &                                 
                    &  ..  &                                
               %.               &                           
               &&              &&                           
                  &&&&&&&&&&&&                              `);
}

module.exports = {
  addons: {
    logPiscoImage: logPiscoImage
  }
};
