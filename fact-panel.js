const FACT_URL = 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en';

class FactPanel extends HTMLElement {
    static observedAttributes = ['compact'];

    buildInterface() {

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

        this.button.addEventListener('click', () => this.loadFact());  
        
        this.loading = false;
        this.loadFact();
    }
    showFact() {
        this.factText.textContent = this.fact.text;
        this.sourceText.textContent = `Source: ${this.fact.source}`;
        this.statusText.textContent  = 'New fact loaded';
    }
    attributeChangedCallback() {
        if (this.getAttribute('compact') !== null) {
            this.sourceText.hidden = true;
        } else {
            this.sourceText.hidden = false;
        }
    }
    async loadFact() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.statusText.textContent = 'Loading a fact...';

        try {
            const response = await fetch(FACT_URL);

            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            const data = await response.json();

            if (typeof data?.text !== "string" || typeof data?.source !== "string" ) {
                 throw new Error("Expected text and source in the response.");
            }

            this.fact = data;
            this.showFact();
            this.button.textContent = 'New Fact';
        } catch (error) {
            console.error('Could not load the fact.', error);
            this.statusText.textContent = 'The request failed. Please try again';
            this.button.textContent = 'Try again';
        }
        this.loading = false;
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