// Background script for the Arabic Linguistic Correction extension
console.log('Background script loaded');

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
	if (message.type === 'CORRECT_TEXT') {
		// In a real implementation, this would call an API for Arabic text correction
		// For now, let's implement a simple mock-up
		const arabicText = message.text;

		// Simple mock correction (replace with actual correction logic/API)
		const correctedText = mockArabicCorrection(arabicText);

		sendResponse({ correctedText });
		return true; // Required for async response
	}
});

// Mock function for Arabic text correction
// This would be replaced with an actual API call or NLP library
function mockArabicCorrection(text: string): string {
	// This is a placeholder. In a real implementation, you would:
	// 1. Send the text to an Arabic NLP API
	// 2. Apply grammatical and spelling corrections
	// 3. Return the corrected text

	// For demo purposes, let's just make a simple replacement
	// Replace common typos or errors (this is just an example)
	const corrections: { [key: string]: string } = {
		انا: 'أنا',
		هاذا: 'هذا',
		هاذه: 'هذه',
		إنشاءالله: 'إن شاء الله',
	};

	let correctedText = text;
	Object.keys(corrections).forEach((error) => {
		const regex = new RegExp(error, 'g');
		correctedText = correctedText.replace(regex, corrections[error]);
	});

	return correctedText;
}
