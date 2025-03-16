// Content script for the Arabic Linguistic Correction extension
console.log('Arabic Correction content script loaded');

// CSS styles for our button
const BUTTON_STYLES = `
  position: absolute;
  z-index: 10000;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 4px;
  font-family: Arial, sans-serif;
`;

// Add correction button to text fields
function addCorrectionButtons() {
	// Get all text input fields, textareas, and contenteditable elements
	const textInputs = document.querySelectorAll<
		HTMLInputElement | HTMLTextAreaElement
	>('input[type="text"], textarea');
	const editableElements = document.querySelectorAll<HTMLElement>(
		'[contenteditable="true"]'
	);

	// Process regular input fields and textareas
	textInputs.forEach((input) => {
		addButtonToField(input);
	});

	// Process contenteditable elements
	editableElements.forEach((element) => {
		addButtonToField(element);
	});
}

// Add button next to a specific field
function addButtonToField(field: HTMLElement) {
	// Check if this field already has our button
	if (field.hasAttribute('data-arabic-correction-processed')) {
		return;
	}

	// Mark as processed
	field.setAttribute('data-arabic-correction-processed', 'true');

	// Create correction button
	const button = document.createElement('button');
	button.textContent = 'تصحيح'; // "Correct" in Arabic
	button.className = 'arabic-correction-button';
	button.style.cssText = BUTTON_STYLES;

	// Make field's parent position relative if it's static
	const fieldParent = field.parentElement;
	if (fieldParent && getComputedStyle(fieldParent).position === 'static') {
		fieldParent.style.position = 'relative';
	}

	// Initial position, will be adjusted based on the field's position
	button.style.display = 'none';

	// Append to document body
	document.body.appendChild(button);

	// Position the button next to the field
	updateButtonPosition(button, field);
	button.style.display = 'block';

	// Add click event to correct text
	button.addEventListener('click', () => {
		correctText(field);
	});

	// Update button position on scroll and resize
	window.addEventListener(
		'scroll',
		() => updateButtonPosition(button, field),
		true
	);
	window.addEventListener('resize', () => updateButtonPosition(button, field));

	// For input fields, monitor focus state
	field.addEventListener('focus', () => {
		button.style.display = 'block';
		updateButtonPosition(button, field);
	});

	field.addEventListener('blur', (e) => {
		// Don't hide if user clicked our button
		if (e.relatedTarget !== button) {
			// Add small delay to allow button click to register
			setTimeout(() => {
				button.style.display = 'none';
			}, 200);
		}
	});
}

// Update button position relative to the field
function updateButtonPosition(button: HTMLButtonElement, field: HTMLElement) {
	const fieldRect = field.getBoundingClientRect();

	button.style.top = `${window.scrollY + fieldRect.top}px`;
	button.style.left = `${window.scrollX + fieldRect.right + 5}px`;
}

// Correct the text in a field
function correctText(field: HTMLElement) {
	let text = '';

	// Get text based on field type
	if (
		field instanceof HTMLInputElement ||
		field instanceof HTMLTextAreaElement
	) {
		text = field.value;
	} else if (field.hasAttribute('contenteditable')) {
		text = field.innerText;
	}

	// Only process if there's text and it appears to contain Arabic
	if (text && containsArabic(text)) {
		// Send to background script for correction
		chrome.runtime.sendMessage(
			{
				type: 'CORRECT_TEXT',
				text: text,
			},
			(response) => {
				if (response && response.correctedText) {
					// Update the field with corrected text
					if (
						field instanceof HTMLInputElement ||
						field instanceof HTMLTextAreaElement
					) {
						field.value = response.correctedText;
					} else if (field.hasAttribute('contenteditable')) {
						field.innerText = response.correctedText;
					}
				}
			}
		);
	}
}

// Function to check if text contains Arabic characters
function containsArabic(text: string): boolean {
	const arabicPattern = /[\u0600-\u06FF]/;
	return arabicPattern.test(text);
}

// Run when content script loads
function init() {
	// Initial scan for text fields
	addCorrectionButtons();

	// Observe DOM for dynamically added elements
	const observer = new MutationObserver((mutations) => {
		let shouldCheck = false;

		mutations.forEach((mutation) => {
			if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
				shouldCheck = true;
			}
		});

		if (shouldCheck) {
			addCorrectionButtons();
		}
	});

	// Start observing
	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
}

// Initialize the content script
init();
