// Activeren van foundation functies
$(document).foundation();

$(function() {
    console.log('jeej het werkt!');
    console.log('jeej het werkt!');
    console.log('jeej het werkt!');
    
    // signin
    $("#additionalParticipantsAdd").click(function(e) {
        e.preventDefault();

        var container = $("#additionalParticipants");

        $.getJSON("/tools/required/get_additional_participants",
            function(data) {
                if (data.error) {
                    alert("Er is iets misgegaan met het toevoegen van een nieuwe ontvanger.");
                } else {
                    container.append(data.html);
                }
            });
    });
});