<script>
    import Search from '@lucide/svelte/icons/search';
    import FileText from '@lucide/svelte/icons/file-text';

    let subsections = [
        {
            items: [
                {label: 'Review any of the Daily Triple Safety Activities and ensure these are conducted effectively'},
                {note: 'Toolbox Meeting, PPE Visual Inspection, Housekeeping'}
            ]
        },
        {
            items: [
                {label: 'Inspects bulletin boards are up to date and neatly kept'},
                {note: 'Safety and warning signboards are available, visible, and in good condition'}
            ]
        },
        {
            items: [
                {label: 'Check availability of Documentation Storage Area'},
                {note: 'Complete safety document (PTW, Check worker\\\'s passport, Permit & CIDB green card validity, SDS, etc.) are stored in an accessible and organized location'}
            ]
        },
        {
            items: [
                {label: 'First Aid Kit'},
                {note: 'First aid kit available, fully stocked, and checked regularly'}
            ]
        },
        {
            items: [
                {label: 'Fire Extinguisher'},
                {note: 'Fire extinguisher available, condition and expiry date'}
            ]
        },
        {
            items: [
                {label: 'Excessive Noise Identification Checklist'},
                {note: 'Ensure the checklist for identification of excessive noise is filled up and current'}
            ]
        },
        {
            items: [
                {label: 'CHRA Suitability'},
                {note: 'Confirm that the generic CHRA used is suitable and applicable for the current site activities'}
            ]
        },
        {
            items: [
                {label: 'No Compromise Audit'},
                {note: 'Check and determine if the once a month "No Compromise Audit" is done and if not, to work with the 3S on site to conduct the audit and align the standard of marking'}
            ]
        }
    ];

    const processedSubsections = subsections.map(s => {
        const items = [];
        for (let i = 0; i < s.items.length; i++) {
            const it = s.items[i];
            if (it.label) {
                let note;
                const next = s.items[i + 1];
                if (next && next.note) {
                    note = next.note;
                    i++;
                }
                items.push({ label: it.label, note });
            } else if (it.note) {
                items.push({ label: '', note: it.note });
            }
        }
        return { items };
    });

    const subsectionOffsets = (() => {
        const offsets = [];
        let acc = 0;
        for (const s of processedSubsections) {
            offsets.push(acc);
            acc += s.items.length;
        }
        return offsets;
    })();
</script>

<h1 class="title">Safety Officer Audit Report (e-SOA) Submission</h1>

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
            <label for="audit-date" class="forms-label">Date:</label>
            <input type="date" class="forms-input">
        </div>
        <div class="forms-p">
            <label for="audit-weather" class="forms-label">Weather:</label>
            <input type="text" class="forms-input">
        </div>
        <br><hr>
        <h2 class="heading">Safety Officer Audit Checklist</h2>
        <div class="categories">
            <p>No.</p>
            <p>Inspection Item</p>
            <p></p>
            <p>Status</p>
            <p></p>
        </div>
        {#each subsections as subsection, sIndex}
            <div class="audit-grid">
                {#each processedSubsections[sIndex].items as item, iIndex}
                    <p class="index">{subsectionOffsets[sIndex] + iIndex + 1}</p>
                    <div>
                        <p>{item.label}</p>
                        {#if item.note}
                            <p class="item-note">{item.note}</p>
                        {/if}
                    </div>
                    <div class="audit-check">
                        <label class="circle-checkbox">
                            <input type="checkbox" name="item-status" />
                            <span class="checkmark" aria-hidden="true"></span>
                        </label>
                    </div>
                    <input type="text" class="audit-remarks" placeholder="Remarks">
                {/each}
            </div>
        {/each}
        <hr>
        <h2 class="heading">Remarks</h2>
        <p><textarea name="" id="" cols="30" rows="10" class="remarks" placeholder="Remarks"></textarea></p>
        <h2 class="heading">Acknowledgement and Submission</h2>
        <div class="container">
            <div class="checkbox">
                <input type="checkbox" name="" id="">
            </div>
            <div class="declaration">
                <p>The declaration for the Safety Officer Audit Report as below:</p>
                <p>I hereby acknowledge that I have conducted a thorough check and confirm the following:</p>
                <p>>> All information in this report is accurate and up to date.</p>
                <p>>> All personnel working on site are registered and have appropriate permits.</p>
                <p>By entering my password below, I confirm my identity and consent as a digital acknowledgment.</p>
                <p>I understand that this action may be recorded as part of the official audit trail.</p>
            </div>
        </div>
        <p class="note">Note: Double check if content is correct before submitting.</p>
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

    .audit-check {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .circle-checkbox {
        display: inline-block;
        position: relative;
        width: 38px;
        height: 38px;
        cursor: pointer;
    }

    .circle-checkbox input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
        padding: 0;
    }

    .circle-checkbox .checkmark {
        display: inline-block;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 2px solid #091747;
        background: #ffffff;
        box-sizing: border-box;
        position: relative;
    }

    .circle-checkbox .checkmark::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 18px;
        height: 18px;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><polyline points='20 6 9 17 4 12' stroke='%23ffffff' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 140ms ease, opacity 120ms ease;
        opacity: 0;
        pointer-events: none;
    }
    .circle-checkbox input:checked + .checkmark {
        background: #091747;
    }

    .circle-checkbox input:checked + .checkmark::after {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }

    .circle-checkbox input:focus + .checkmark {
        outline: 3px solid rgba(9,23,71,0.12);
    }

    .audit-grid {
        margin: 15px 0;
        display: grid;
        grid-template-columns: 40px 3fr 50px 3fr;
        align-items: center;
        gap: 10px;
    }

    .audit-remarks {
        width: 100%;
        height: 38px;
        padding: 6px 10px;
        font-size: 14px;
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
        grid-template-columns: 40px 3fr 50px 50px 3fr;
        text-align: center;
        font-weight: bold;
        align-items: center;
        gap: 10px;
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

    .index {
        text-align: center;
    }

    .item-note {
        margin-top: 6px;
        font-size: 12px;
        color: #4a5568;
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
</style>