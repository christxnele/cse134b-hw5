const sampleFacts = [
    { text: 'Honey can last for thousands of years.', source: 'Sample source A' },
    { text: 'Octopuses have three hearts.', source: 'Sample source B' },
    { text: 'Identical twins do not have the same fingerprints.', source: 'Sample source C' },
    { text: 'Earlobes have no biological purpose.', source: 'Sample source D' },
    { text: 'There is no such thing as zero-calorie foods.', source: 'Sample source E' },
];

class FactPanel extends HTMLElement {
    static observedAttributes = ['compact']

    buildInterface() {

        this.index = 0;

        const heading = document.createElement('h2');
        heading.textContent = 'Random Fact';
        this.appendChild(heading);

        this.factText = document.createElement('p');
        this.appendChild(this.factText);

        this.sourceText = document.createElement('p');
        this.appendChild(this.sourceText);

        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.textContent = 'New Fact';
        this.appendChild(this.button);

        this.statusText = document.createElement('p');
        this.statusText.setAttribute('role', 'status');
        this.appendChild(this.statusText);

        this.button.addEventListener('click', () => this.nextFact())   
        
        this.showFact();
    }
    showFact() {
        const fact = sampleFacts[this.index];
        this.factText.textContent = fact.text;
        this.sourceText.textContent = `Source: ${fact.source}`;
        this.statusText.textContent  = `Fact ${this.index + 1} of ${sampleFacts.length}`;
    }
    nextFact() {
        this.index = this.index + 1

        if (this.index === sampleFacts.length) {
            this.index = 0;
        }
        this.showFact();
    }
    attributeChangedCallback() {
        if (this.getAttribute('compact') !== null) {
            this.sourceText.hidden = true;
        } else {
            this.sourceText.hidden = false;
        }
    }
}

customElements.define('fact-panel', FactPanel);

function loadHandler() {
    const panel = document.querySelector('fact-panel');
    panel.buildInterface();

    const toggleButton = document.querySelector('#toggle-details');

    function toggleHandler() {
        panel.toggleAttribute('compact');
    }

    toggleButton.addEventListener('click', toggleHandler);

}


window.addEventListener('DOMContentLoaded', loadHandler);