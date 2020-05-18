import React from "react"
import {mount} from "enzyme"
import Root from "Root"
import App from "components/App"
import moxios from "moxios"

beforeEach(()=>{
    moxios.install();
     
    moxios.stubRequest("http://jsonplaceholder.typicode.com/comments",{
        status:200,
        response:[{name:"comment 1"},{name:"comment 2"}]
    });
})

afterEach(()=>{
    moxios.uninstall();
    
})
it("can fetch list of comments and display them",(done)=>{

    // test will wait until done(callback)
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    )
    wrapped.find(".fetch-comments").simulate("click");
    //this timeout is because moxios takes some time to respond
    // setTimeout(()=>{
    //     wrapped.update()
    //     expect(wrapped.find("li").length).toEqual(2)

    //     //until done callback is called it statement will wait
    //     done()
    //     wrapped.unmount();
    // },100);    


      //this timeout is because moxios takes some time to respond
      moxios.wait(()=>{
        wrapped.update()
        expect(wrapped.find("li").length).toEqual(2)

        //until done callback is called "it" statement will wait
        done()
        wrapped.unmount();
    }); 

})