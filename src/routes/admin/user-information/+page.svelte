<script>
    export let data;
    /** @type {Array<{ items: Array<any>}>} */
    const users = data.users;
    import Search from '@lucide/svelte/icons/search';
    let searchText = '';
    let selectedDepartment = 'All';

    $: filteredUsers = users.flatMap(group => group.items).filter(user => {
        const matchesSearch = 
            user.name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            user.department.toLowerCase().includes(searchText.toLocaleLowerCase());
        
        const matchesDepartment = 
            selectedDepartment === 'All' ||
            user.department === selectedDepartment;
        
        return matchesSearch && matchesDepartment;
    });
</script>


<h1 class="title">User Information Management</h1>

<div class="filter-bar">
    <input type="text" placeholder="Search here..." bind:value={searchText} class="filter-input"/>
    <select bind:value={selectedDepartment} class="department-select">
        <option value="All">All Departments</option>
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
    <button class="button-primary" id="button-search"><Search /></button>
</div>

<div class="card-grid">
    {#each filteredUsers as item}
        <div class="user-card">
            <div class="user-info">
                <h3>{item.name}</h3>
                <p>Department: {item.department}</p>
                <p>Position: {item.title}</p>
                <p>E-mail: {item.email}</p>
            </div>
            <div class="button-modify">
                <button>Edit</button>
                <button class="button-inverted">Delete</button>
            </div>
        </div>
    {/each}
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

    .button-inverted {
        background-color: #ffffff;
        color: #05577ed7;
        font-size: small;
        margin-top: 5px;
        padding: 6px 14px;
        border: 2px solid #05577ed7;
        border-radius: 4px;
        cursor: pointer;
    }

    .button-inverted:hover {
        background-color: #dedede;
    }

    .button-modify {
        display: grid;
        width: 20%;
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
        vertical-align: middle;
    }

    .card-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    .department-select {
        font-size: 14px;
        cursor: pointer;
    }

    .filter-bar {
        padding: 10px;
    }

    .filter-input {
        width: 30%;
        font-size: 14px;
    }

    h3 {
       font-weight: bold; 
    }

    .title {
        font-size: 35px;
        font-weight: bold;
        margin-bottom: 20px;
        padding: 0 10px;
    }

    .user-card {
        display: flex;
        align-items: center;
        gap: 16px;
        background-color: #ffffff;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        padding: 15px 20px;
        margin: 10px 10px 0;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .user-info {
        width: 80%;
    }

    .user-info p {
        font-size: 14px;
    }
</style>