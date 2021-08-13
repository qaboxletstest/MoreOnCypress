describe("Upload a File SUITE", () => {
    it("XHR Way", () => {
        function form_request(method, url, formData, done) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url)
            xhr.onload = function () {
                done(xhr);
            };
            xhr.onerror = function () {
                done(xhr);
            };
            xhr.send(formData);
        }

        const fileName = "yey.jpg";
        const method = "POST";
        const url = "http://localhost:4000/graphql";
        const fileType = "image/jpg";

        cy.fixture(fileName, "binary")
            .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin))
            .then((blob) => {
                const formData = new FormData();
                formData.append("operations", "{\"query\":\"mutation($file:Upload!) {singleUploadFile(file: $file){url}}\"}");
                formData.append("map", "{\"0\": [\"variables.file\"]}");
                formData.append("0", blob, fileName);
                form_request(method, url, formData, function (response) {
                    console.log(response.response)
                    expect(response.status).to.eq(200);
                    expect(JSON.parse(response.response).data.singleUploadFile.url).to.eq(`http://localhost:4000/FileUpload/${fileName}`);
                });
            });
    });
});