document.addEventListener('DOMContentLoaded', () => {
    const chartCanvas = document.getElementById('skills-radar-chart');
    if (!chartCanvas) return;

    const chartData = {
        labels: [
            'Web Security',
            'Malware Analysis',
            'Network Security',
            'Penetration Testing',
            'Cryptography',
            'Incident Response'
        ],
        datasets: [{
            label: 'Proficiency',
            data: [85, 75, 80, 90, 70, 85],
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            borderColor: '#22C55E',
            pointBackgroundColor: '#22C55E',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#22C55E'
        }]
    };

    const chartOptions = {
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                pointLabels: {
                    color: '#fff',
                    font: {
                        family: "'Poppins', sans-serif",
                        size: 14
                    }
                },
                ticks: {
                    display: false,
                    beginAtZero: true,
                    max: 100,
                    min: 0,
                    stepSize: 20
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false
    };

    let skillChart;

    const createChart = () => {
        if (skillChart) {
            skillChart.destroy();
        }
        skillChart = new Chart(chartCanvas, {
            type: 'radar',
            data: chartData,
            options: chartOptions
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createChart();
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.5 });

    observer.observe(chartCanvas);
});
