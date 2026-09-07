$(document).ready(function () {

    // When user selects an image, show preview and reveal the button
    $("#imageUpload").change(function () {
        $("#result span").text("");         // clear old result
        $(".loader").hide();                // hide loader if any
        readURL(this);                      // show preview
        $(".image-section").show();         // show section with button
    });

    // Handle predict button click
    $("#btn-predict").click(function () {

        var form_data = new FormData($('#upload-file')[0]);

        // Show loading indicator
        $(this).prop('disabled', true);
        $("#result span").text("");
        $(".loader").show();

        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                // Hide loader
                $(".loader").hide();
                $("#btn-predict").prop('disabled', false);

                // Put text from Flask into the result span
                $("#result span").text(data);
                console.log("Prediction result:", data);
            },
            error: function (xhr, status, error) {
                $(".loader").hide();
                $("#btn-predict").prop('disabled', false);
                $("#result span").text("Error during prediction.");
                console.log("Error:", error);
            }
        });
    });

});

// Helper: show preview image
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
