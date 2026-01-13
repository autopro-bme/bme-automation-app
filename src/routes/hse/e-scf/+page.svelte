<script>
    import FileText from "@lucide/svelte/icons/file-text";
    import Search from "@lucide/svelte/icons/search";
</script>

<h1 class="title">Staff Claim Form Report (e-SCF) Submission</h1>

<div class="project-box">
    <form action="" class="forms">
        <h2 class="heading">Staff Information</h2>
        <div class="forms-p">
             <label for="staff-name" class="forms-label">Name:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
             <label for="staff-position" class="forms-label">Position:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="department" class="forms-label">Department:</label>
            <select class="department-select">
                <option value="" disabled selected></option>
                <option value="Project">Project</option>
                <option value="HSE">HSE</option>
            </select>
        </div>
        <br><hr>
        <h2 class="heading">Claim Information</h2>
         <div class="forms-p">
            <label for="claim-date" class="forms-label">Date:</label>
            <input type="date" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="project-id" class="forms-label">Project ID:</label>
            <input type="text" placeholder="MP1234" class="forms-input">
            <button class="button-primary" id="button-search"><Search size={16} /></button>
        </div>
        <div class="forms-p">
            <label for="claim-location" class="forms-label">Location:</label>
            <input type="text" placeholder="House-Site-House (0km)" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="site-allowance" class="forms-label">Site Allowance:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="accommodation" class="forms-label">Accommodation:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="toll-fare" class="forms-label">Toll Fare:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="fuel-cost" class="forms-label">Fuel Cost:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="claim-mileage" class="forms-label">Mileage:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="car-rental" class="forms-label">Car Rental:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="site-purchase" class="forms-label">Site Purchase:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="maps-screenshot" class="forms-label">Maps Screenshot:</label>
            <div class="upload">
                <p class="upload-text"><input type="file" id="maps_photo" name="maps_photo" accept="image/png, image/jpeg" /></p>
            </div>
        </div>
        <div class="forms-p">
            <label for="claim-other" class="forms-label">Other:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="claim-remarks" class="forms-label">Remarks:</label>
            <textarea name="" id="" cols="30" rows="10" class="remarks" placeholder="Remarks"></textarea>
        </div>
        <br><hr>
        <h2 class="heading">Acknowledgement and Submission</h2>
        <div class="container">
            <div class="checkbox">
                <input type="checkbox" name="" id="">
            </div>
            <div class="declaration">
                <p>The declaration for the Staff Claim Form Report as below:</p>
                <p>I hereby acknowledge that I have conducted a thorough check and confirm the following:</p>
                <p>>> All information in this report is accurate and up to date.</p>
                <p>>> All personnel working on site are registered and have appropriate permits.</p>
                <p>By entering my password below, I confirm my identity and consent as a digital acknowledgment.</p>
                <p>I understand that this action may be recorded as part of the official audit trail.</p>
            </div>
        </div>
        <p>Note: Double check if content is correct before submitting.</p>
        <div class="forms-p">
            <p><b>Confirm Login Password</b></p>
            <input type="password" class="forms-input">
        </div>
        <div class="submit">
            <button type="submit" class="button-submit"><FileText />Submit</button>
        </div>
    </form>
</div>

<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
        color: #091747;
    }

    button {
        background-color: #05577ed7;
        color: #ffffff;
        border: none;
        font-size: small;
        padding: 6px 14px;
        border-radius: 4px;
        cursor: pointer;
    }

    .button-primary {
        background-color: #091747;
        font-weight: bold;
        padding: 10px 20px;
    }

    .button-primary:hover {
        background-color: #091747b9;
    }

    #button-search {
        display: flex;
        justify-content: center;
        vertical-align: middle;
        height: 30px;
    }

    .button-submit {
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: #091747;
        font-weight: bold;
        margin: 5px;
        padding: 10px 20px;
    }

    .button-submit:hover {
        background-color: #091747b9;
    }

    .container {
        display: flex;
        margin: 10px 0;
    }

    .declaration {
        padding: 0 10px;
        font-weight: bold;
    }

    .declaration p {
        margin-bottom: 10px;
    }

    .department-select {
        height: 30px;
        margin: 10px 0;
    }

    .forms {
        margin: 0;
        position: relative;
    }

    .forms-input {
        height: 30px;
        width: 500px;
        font-size: 14px;
    }

    .forms-label {
        width: 200px;
        font-size: 14px;
    }
    
    .forms-p {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 10px 0;
    }

    .heading {
        margin: 10px 0;
        font-size: 20px;
        font-weight: bold;
    }

    .project-box {
        margin: 10px;
        border: 1px solid #091747;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
    }

    .remarks {
        width: 500px;
        height: 200px;
    }

    .submit {
        display: flex;
        justify-content: flex-end;
    }

    .title {
        font-size: 35px;
        font-weight: bold;
        margin-bottom: 20px;
        padding: 0 10px;
    }

    .upload {
        width: 500px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 10px;
        border: 1px solid #091747;
        border-radius: 2px;
    }

    .upload-text {
        width: fit-content;
    }
</style>