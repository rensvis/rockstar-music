describe('playlist', () => {
    it('user can create playlist', () => {
        const playlistName = 'Cypress Test playlist';
        // 1. create playlist
        cy.visit('/playlists') // navigate to playlists
        // create playlist
        cy.findByRole('textbox', {
            name: /new playlist/i
        }).type(playlistName); // type playlist name
        cy.findByRole('button', {
            name: /add/i
        }).click() // click add button

        // 2. add song
        cy.visit('/') // navigate to artists
        cy.findByRole('link', {
            name: /ac\/dc/i
        }).click() // click on artist
        cy.findByRole('add-20').click() // click on song add button
        cy.findByText(playlistName).siblings('button').click() // add to playlist

        // 3. verify if song was added to playlist
        cy.visit('/playlists') // navigate to playlists
        cy.findByRole('link', {
            name: `${playlistName} (1 songs)`
        }).click() // click playlist
        cy.findByRole('heading', {
            name: /highway to hell \(live\)/i
        }).should('be.visible') // check songs is added


        // 4. clean up
        cy.findByRole('button', {
            name: /delete playlist/i
        }).click() // delete playlist

    })
})