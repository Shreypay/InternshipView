
const puppeteer = require('puppeteer');
async function scrapeProduct (url){

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const length = 10;//Can only do 6
    var div_row = 1;
    var div_col = 1;
    const maxRow_num = 3;

    for(let i=0;i < length; i++){
        if (div_row == maxRow_num){//closing brackets doesnt work
          let div_row = 1;
          div_col++;
    }
        
        const [el1] = await page.$x('//*[@id="site-content"]/div[2]/div/article/div/div[2]/div['+div_col+']/div['+div_row+']/div/div/div[2]/h4/a');
                                    // Page Check
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[1]/div/div/div[2]/h4/a
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[1]/div/div/div[2]/h4/a
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[2]/div/div/div[2]/h4/a
                                    //html/body/main/div[2]/div/article/div/div[2]/div[2]/div[1]/div/div/div[2]/h4/a
                                    //html/body/main/div[2]/div/article/div/div[2]/div[2]/div[1]/div/div/div[2]/h4/a
                                    //Row/Col Check
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[1]/div/div/div[2]/h4/a
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[2]/div/div/div[2]/h4/a
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[3]/div/div/div[2]/h4/a
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[3]/div[1]/div/div/div[2]/h4/a
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[4]/div[1]/div/div/div[2]/h4/a
        const txt1 = await el1.getProperty('textContent');
        const Name = await txt1.jsonValue();

        const [el2] = await page.$x('//*[@id="site-content"]/div[2]/div/article/div/div[2]/div['+div_col+']/div['+div_row+']/div/div/div[2]/text()[3]');
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[1]/div/div/div[2]/text()[3]
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[3]/div/div/div[2]/text()[2]

        const txt2 = await el2.getProperty('textContent');
        const Phone = await txt2.jsonValue();

        const [el3] = await page.$x('//*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[1]/div/div/div[2]/h4/a');
        const txt3 = await el3.getProperty('textContent');
        const Emails = await txt3.jsonValue();

        const [el4] = await page.$x('//*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[1]/div/div/div[2]/text()[2]');
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[2]/div/div/div[2]/text()[2]
                                    //*[@id="site-content"]/div[2]/div/article/div/div[2]/div[2]/div[3]/div/div/div[2]/text()[2]
        const txt4 = await el4.getProperty('textContent');
        const Specializing = await txt4.jsonValue();


        for (i=0;Phone.length < i;i++){
            //if statment doesnt work need to fix
            const phoneCheck = Phone.charAt(i);
            if(phoneCheck == ' ' || phoneCheck == 'n' || phoneCheck == 't'){
                Phone.charAt(i) = ''; 
                console.log(Phone);
            }  
        }    
        console.log({Name, Phone});
        div_row++;
        
        
    }
    
    browser.close();
}


scrapeProduct('http://emeraldcoasthomesonline.com/agents/');

