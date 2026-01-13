<script>
    import ListPlus from '@lucide/svelte/icons/list-plus';
    import CloudDownload from '@lucide/svelte/icons/cloud-download';
</script>

<h1 class="title">Project Information Management</h1>

<div class="filter-bar">
    <h2 class="status">Project Status</h2>
    <select name="" id="" class="status-select">
        <option value="" disabled selected>Choose a Project Status</option>
        <option value="commissioning">Commissioning</option>
        <option value="delivery">Delivery</option>
        <option value="factory">Factory</option>
        <option value="installation">Installation</option>
        <option value="mechanical-completion">Mechanical Completion</option>
        <option value="n/a">N/A</option>
    </select>
</div>

<div class="filter-bar">
    <select name="" id="" class="option-select">
        <option value="" disabled selected>Choose a Data Option</option>
        <option value="project-id">Project ID</option>
        <option value="project-name">Project Name</option>
        <option value="region">Region</option>
    </select>
    <input type="text" placeholder="Project ID/Project Name/Region" class="filter-input">
</div>
<div class="button-modify">
    <button class="button-assign"><ListPlus/><span>New Project</span></button>
    <button class="button-download"><CloudDownload/><span>Excel</span></button>
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

    button:hover {
        background-color: #05577ea4;
    }

    .button-assign {
        width: 150px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .button-assign span {
        color: #ffffff;
    }

    .button-download {
        background-color: #31b647;
        width: 150px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .button-download span {
        color: #ffffff;
    }

    .button-download:hover {
        background-color: #31b647bd;
    }

    .button-modify {
        display: flex;
        padding: 10px;
        justify-content: space-between;
    }

    .filter-bar {
        padding: 10px;
    }

    .filter-input {
        width: 20%;
        font-size: 14px;
    }

    .option-select, .status-select {
        font-size: 14px;
        width: 20%;
        cursor: pointer;
    }

    .title {
        font-size: 35px;
        font-weight: bold;
        margin-bottom: 20px;
        padding: 0 10px;
    }
</style>