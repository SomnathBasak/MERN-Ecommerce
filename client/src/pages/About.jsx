import React from 'react';

const About = () => {
    return (
        <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <div className="text-justify mt-2">      
  <h2 style={{fontFamily: 'Sans-serif', textAlign: 'center'}}>Welcome To <span id="W_Name1">Ecommerce</span></h2>
  <p><span id="W_Name2">Ecommerce</span> is a Professional <span id="W_Type1">Ecommerce</span> Platform. Here we will only provide you with interesting content that you will enjoy very much. We are committed to providing you the best of <span id="W_Type2">Ecommerce</span>, with a focus on reliability and <span id="W_Spec">Ecommerce</span>. we strive to turn our passion for <span id="W_Type3">Ecommerce</span> into a thriving website. We hope you enjoy our <span id="W_Type4">Ecommerce</span> as much as we enjoy giving them to you.</p>
  <p>I will keep on posting such valuable anf knowledgeable information on my Website for all of you. Your love and support matters a lot.</p>
  <p style={{fontWeight: 'bold', textAlign: 'center'}}>Thank you For Visiting Our Site<br /><br />
    <span style={{color: 'blue', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Have a great day !</span></p>
          </div>
        </div>
      </div>
    );
};

export default About;