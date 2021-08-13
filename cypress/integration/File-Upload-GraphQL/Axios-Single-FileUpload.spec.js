describe('Axios Single File Upload To GraphQL Server', () => {
    it('Single File Upload Test', () => {
        cy.task("axiosSingleFileUpload").then(data => {
            expect((JSON.parse(data)).data.singleUploadFile.url).to.eq(`http://localhost:4000/FileUpload/Yey.jpg`);
        })
    });
});