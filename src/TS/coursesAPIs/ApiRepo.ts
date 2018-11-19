import {API} from './enumRepo';
    //Edx
    const EDXPostUrl : string = "https://api.edx.org/oauth2/v1/access_token/";
    const EDXGetUrl : string = "https://api.edx.org/catalog/v1/catalogs/";
    
    const EDXClientID : string = "z4WOEnAq48L5Ins6n1NlMiLEbECR7A4dx2kSpcCz";
    const EDXClientSecret : string = "pwLHkadXIO3pX5Wuav3pRvobDbmxIOhbO2EdObcJLWoBO57GilliuFsbwTUoh6U03zxbQQUWexoUmlBb620f4nlJ7FJ5raTwVQVArJt3abI0qDXCPQGmeRkvHDdx6IHF";
    const EDXAuth : string = "grant_type=client_credentials&client_id=" + EDXClientID + "&client_secret=" + EDXClientSecret + "&token_type=jwt";
    
    const EDXOptions : any = {
        headers: {
            
        },
    
        json: true
    };
    
    //KhanAcademy
    const KhanAcademyGetUrl : string = "http://www.khanacademy.org/api/v1/topic/";
    
    const KhanAcademyOptions : any = {
        headers: {
            //no header info required
        },
        json: true,
    };
    
    //Udemy
    const UdemyGetUrl : string = "https://www.udemy.com/api-2.0/courses/";
    
    const UdemyClientID : string = 'wVj9K4L6NfGMMYKFM1loWPtGXdBR6NG9vNYtOsBc';
    const UdemyClientSecret : string = '1IDh0trd3J09Xv0waNHs0KRa89YXbYCuADIUzC7gi3FjnawWQvK6PTkCLK0p1ApFS4jz2lsFxfGbJWTZlUBiLwgPANyU6zifdMKmgh37nRIf5fGYj1TTGUiSr64ZjHi1';
    var UdemyAuth =  'Basic ' + btoa(UdemyClientID + ':' + UdemyClientSecret);
    
    const UdemyOptions : any = {
        headers: {
            //headerinfo for authorization with udemy
            'Authorization' : UdemyAuth,
            
            
        },
        json: true,
    };

    //DB
    const DBgetUrl : string = "http://127.0.0.1:8080/servlet/services/rest/";
    const DBOptions : any = {
        // headers: {
        //     //headerinfo for authorization with udemy
        //     'Authorization' : UdemyAuth,
            
            
        // },
        json: true,
    };


    
export class ApiRepo {


    private accessToken : string = "";

    getOptions(api : API) : any {
        if (api === API.Edx) {
            return EDXOptions;
        } else if (api === API.Udemy) {
            return UdemyOptions;
        } else if (api === API.KhanAcademy) {
            return KhanAcademyOptions;
        } else if (api === API.DB) {
            return DBOptions;
        }

        return "error: no specified options";
    }

    getGETUrl(api : API) : string {
        if (api === API.Edx) {
            return EDXGetUrl;
        } else if (api === API.Udemy) {
            return UdemyGetUrl;
        } else if (api === API.KhanAcademy) {
            return KhanAcademyGetUrl;
        } else if (api === API.DB) {
            return DBgetUrl;
        }

        return "error: no specified get-url";
    }

    getAuthUrl(api : API) : any {
        if (api === API.Edx) {
            //slechte get
            return EDXPostUrl + EDXAuth;
        } else if (api === API.Udemy) {
            //auth through get-request
        } else if (api === API.KhanAcademy) {
            //no auth needed
        } else if (api === API.DB) {
            //no auth needed
        }

        return "error: no specified-getAuthUrl";
    }

    //nodig voor EDX
    setAccessToken(POSTResponse : any) {
        this.accessToken = POSTResponse.access_token;
    }

    getAccessToken() : string {
        return this.accessToken;
    }


}