//-- All Hero-Card specific requests

//-- Delete HERO if requested from a card
const hero_Delete = async (session_UserId, user_id, hero_id) => {
    console.log("delete requested")
    try{

        if(session_UserId === user_id) {
            const response = await fetch(`/api/heroes/${hero_id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(`${hero_id} ${response.statusText}`);
            }
        }
    }
    catch (err){
        alert(`Error: ${err}`)
    }
};

//-- Modal Specific behaviors for Hero Card
var modal = document.getElementById("div-onload-modal"); // Get the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};