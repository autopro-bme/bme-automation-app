<script>
    export let data;
    /** @type {Array<{ items: Array<any>}>} */
    const users = data.users;
    let selectedDepartment = 'All';
    let selectedUser = '';

    $: allUsers = users.flatMap(group => group.items);

    $: filteredUsers = selectedDepartment === 'All'
        ? allUsers : allUsers.filter(user => user.department === selectedDepartment);
</script>

<h1 class="title">User Access Management</h1>

<div class="filter-bar">
    <h2 class="department">Department</h2>
    <select bind:value={selectedDepartment} class="department-select">
        <option value="All" disabled selected>All Departments</option>
        <option value="Account">Account</option>
        <option value="Administration">Administration</option>
        <option value="After Sales">After Sales</option>
        <option value="Business Development">Business Development</option>
        <option value="Design">Design</option>
        <option value="HR">HR</option>
        <option value="Inventory">Inventory</option>
        <option value="IT">IT</option>
        <option value="Legal">Legal</option>
        <option value="Logistics">Logistics</option>
        <option value="Management">Management</option>
        <option value="Operational Excellence">Operational Excellence</option>
        <option value="Packing">Packing</option>
        <option value="Production">Production</option>
        <option value="Project">Project</option>
        <option value="Purchasing">Purchasing</option>
        <option value="Quality Control">Quality Control</option>
        <option value="Safety & Health">Safety & Health</option>
        <option value="Sales">Sales</option>
        <option value="Special Project">Special Project</option>
    </select>
    <h2 class="user">User</h2>
    <select bind:value={selectedUser} class="user-select">
        <option value="" disabled selected>All Users</option>
        {#each filteredUsers as item}
            <option value={item.name}>{item.name}</option>
        {/each}
    </select>
</div>
<div class="button-modify">
    <button class="button-inverted">Remove All Access From This User</button>
    <button class="button-assign">Assign Access To This User</button>
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
        width: 250px;
        height: 40px;
    }

    .button-inverted {
        background-color: #ffffff;
        color: #05577ed7;
        width: 250px;
        height: 40px;
        font-size: small;
        padding: 6px 14px;
        border: 2px solid #05577ed7;
        border-radius: 4px;
        cursor: pointer;
    }

    .button-inverted:hover {
        background-color: #dedede;
    }

    .button-modify {
        display: flex;
        width: 40%;
        padding: 10px 0 10px 10px;
        justify-content: space-between;
    }

    .department, .user {
        font-size: large;
        font-weight: bold;
        margin: 10px 0;
    }

    .department-select, .user-select {
        font-size: 14px;
        width: 40%;
        cursor: pointer;
    }

    .filter-bar {
        padding: 10px;
    }

    .title {
        font-size: 35px;
        font-weight: bold;
        margin-bottom: 20px;
        padding: 0 10px;
    }
</style>