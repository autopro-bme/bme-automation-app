<script>
    import Search from '@lucide/svelte/icons/search';
    import FileText from '@lucide/svelte/icons/file-text';
    const topics = [
        'Basic First Aid',
        'Chemical Handling',
        'Company Policy and Rules',
        'Confined Space',
        'Electrical Safety',
        'Emergency Response Plan',
        'Equipment Inspection',
        'Evacuation Point',
        'Fire Emergency',
        'Heavy Lifting',
        'HIRARC',
        'Hot Work Procedure',
        'Housekeeping',
        'Material Handling / Storage',
        'Permit to Work',
        'Personal Protective Equipment',
        'Scaffolding',
        'Warning / Barricade / Signboard',
        'Working at Height'
    ];
    const attendances = [
        'No. of Project Engineer:',
        'No. of Project Supervisor:',
        'No. of Safety & Health Officer:',
        'No. of Site Safety Supervisor:',
        'No. of Contractor Supervisor (OSH-C):',
        'No. of Contractor Worker (OSH-C):',
        'No. of Contractor Supervisor (non OSH-C):',
        'No. of Contractor Worker (non OSH-C):',
        'No. of BME Worker:',
        'No. of Other:'
    ];
</script>

<h1 class="title">Tool Box Meeting Report (e-TBM) Submission</h1>

<div class="project-box">
    <form action="" class="forms">
        <h2 class="heading">General Information</h2>
        <button type="submit" class="button-primary"><Search />Search Project</button>
        <div class="forms-p">
            <label for="project-name" class="forms-label">Project Name:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="project-no" class="forms-label">Project No.:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="project-region" class="forms-label">Region:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="project-location" class="forms-label">Location:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="project-date" class="forms-label">Meeting Date:</label>
            <input type="date" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="project-weather" class="forms-label">Weather:</label>
            <input type="text" class="forms-input">
        </div>
        <br><hr>
        <h2 class="heading">Meeting Topics</h2>
        <div class="topics-grid">
            {#each topics as topic}
                <label for="" class="topic-item">
                    <input type="checkbox"> {topic}
                </label>
            {/each}
                <label class="topic-item"><input type="checkbox">
                     Other Topics: <input type="text" class="topic-input">
                </label>
        </div>
        <br><hr>
        <h2 class="heading">Competency</h2>
        <p class="note">Note: Please tick if these activities were performed for the day and if the Trained Person has the relevant Permit / License / Certificate of Attendance.</p>
        <div class="categories">
            <p>Competent Person</p>
            <p>Permit/License</p>
        </div>
        <div class="competency-grid">
            <p>1) Mobile Crane - Operator Certificate</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>2) Mobile Crane - Perakuan Mesin Angkat (PMA)</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>3) Sky Lift Operator- Perakuan Mesin Angkat (PMA)</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>4) Scaffold Inspector Level 2 / 3</p>
            <p class="competency-radio"><input type="radio">Yes-Level 2</p>
            <p class="competency-radio"><input type="radio">Yes-Level 3</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>5) Scaffold Inspector Level 1</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>6) Authorised Gas Tester</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>7) Entry Supervisor</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <br>
        <div class="categories">
            <p>Trained Person</p>
            <p>Certificate of Attendance</p>
        </div>
        <div class="competency-grid">
            <p>1) Lifting Supervisor</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>2) Signalman</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>3) Rigger and Slinger</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>4) Backhoe</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <div class="competency-grid">
            <p>5) Forklift</p>
            <p class="competency-radio"><input type="radio">Yes</p>
            <p class="competency-radio"><input type="radio">No</p>
            <p class="competency-radio"><input type="radio">No Activity</p>
        </div>
        <br><hr>
        <h2 class="heading">Attendance Information</h2>
        <div class="forms-p">
            <label for="project-name" class="forms-label">Conducted By:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="project-no" class="forms-label">Position:</label>
            <input type="text" class="forms-input">
        </div>
        <div class="attendance-grid">
            {#each attendances as attendance}
                <div class="attendance-type">
                    <label for="attendance-type" class="attendance-label">{attendance}</label>
                    <input type="text" inputmode="numeric" pattern="[0-9]*" class="attendance-count">
                </div>
            {/each}
        </div>
        <br><hr>
        <h2 class="heading">Daily Toolbox / Safety Briefing Attendance List</h2>
        <p class="note">Please upload photo to show a list of all the attendees i.e. name, designation, company and signature</p>
        <p><b><i>Sample:</i></b></p>
        <img src="\src\images\sample-attendees.png" alt="Sample Attendees Form" width="40%">
        <h2 class="heading">Photo of Filled TBM Form</h2>
        <div class="upload">
            <p class="upload-text"><input type="file" id="tbm_form" name="tbm_form" accept="image/png, image/jpeg" /></p>
        </div>
        <h2 class="heading">Photos of TBM in Session</h2>
        <p class="note">Note: All attending personnel should be in full PPE</p>
        <div class="upload">
            <p class="upload-text"><input type="file" id="tbm_photo" name="tbm_photo" accept="image/png, image/jpeg" /></p>
        </div>
        <h2 class="heading">Photo of Filled PTW Form</h2>
        <div class="upload">
            <p class="upload-text"><input type="file" id="ptw_form" name="ptw_form" accept="image/png, image/jpeg" /></p>
        </div>
        <h2 class="heading">Another Document or Image</h2>
        <div class="upload">
            <p class="upload-text"><input type="file" id="ptw_form" name="ptw_form" accept="image/png, image/jpeg" /></p>
        </div>
        <hr>
        <h2 class="heading">Remarks</h2>
        <p><textarea name="" id="" cols="30" rows="10" class="remarks" placeholder="Remarks"></textarea></p>
        <h2 class="heading">Acknowledgement and Submission</h2>
        <div class="container">
            <div class="checkbox">
                <input type="checkbox" name="" id="">
            </div>
            <div class="declaration">
                <p>The declaration for the Tool Box Meeting Report as below:</p>
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

    .attendance-count {
        width: 30px;
        height: 30px;
        font-size: 14px;
        padding: 1px;
        text-align: center;
    }

    .attendance-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px 20px;
    }

    .attendance-label {
        width: 275px;
        font-size: 14px;
    }

    .attendance-type {
        display: flex;
        align-items: center;
        gap: 10px;
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
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: #091747;
        font-weight: bold;
        margin: 10px 0 20px 0;
        padding: 10px 20px;
    }

    .button-primary:hover {
        background-color: #091747b9;
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

    .categories {
        margin: 10px 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        text-align: center;
        font-weight: bold;
    }

    .competency-grid {
        margin-top: 15px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .competency-radio {
        display: flex;
        align-items: center;
        gap: 5px;
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
        width: 150px;
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

    hr {
        color: #091747;
    }

    .note {
        margin-bottom: 10px;
    }
    
    .project-box {
        margin: 10px;
        border: 1px solid #091747;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
    }

    .remarks {
        width: 100%;
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

    .topics-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px 20px;
    }

    .topic-input {
        height: 25px;
        width: 150px;
        font-size: 14px;
    }

    .topic-item {
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
    }

    .upload {
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