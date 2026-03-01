document.addEventListener('DOMContentLoaded', () => {
    // --- Clock Configuration ---
    const clockConfigs = [
        { id: 'clock-chicago', city: 'Chicago', timezone: 'America/Chicago' },
        { id: 'clock-london', city: 'London', timezone: 'Europe/London' },
        { id: 'clock-tel-aviv', city: 'Tel Aviv', timezone: 'Asia/Jerusalem' },
        { id: 'clock-johannesburg', city: 'Johannesburg', timezone: 'Africa/Johannesburg' },
        { id: 'clock-sydney', city: 'Sydney', timezone: 'Australia/Sydney' }
    ];

    // --- Functions ---
    function updateClocks() {
        const now = new Date();

        clockConfigs.forEach(config => {
            const clockEl = document.getElementById(config.id);
            if (!clockEl) return;

            const timeEl = clockEl.querySelector('.time');
            const dateEl = clockEl.querySelector('.date');

            try {
                // Time Format
                const timeStr = now.toLocaleTimeString('en-GB', {
                    timeZone: config.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });

                // Date Format
                const dateStr = now.toLocaleDateString('en-GB', {
                    timeZone: config.timezone,
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });

                timeEl.textContent = timeStr;
                dateEl.textContent = dateStr;
            } catch (err) {
                console.error(`Error formatting time for ${config.city}:`, err);
                timeEl.textContent = 'Error';
            }
        });
    }

    // --- Initialization ---
    updateClocks();
    setInterval(updateClocks, 1000);

    // Refresh Button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Force quick flash for visual feedback
            const container = document.querySelector('.clock-container');
            container.style.opacity = '0.5';
            setTimeout(() => {
                container.style.opacity = '1';
                updateClocks();
            }, 100);
        });
    }
});
