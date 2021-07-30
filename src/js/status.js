import './general';
import apiCall from './services/api/apiCall';
import Chart from 'chart.js';

class Status{
    constructor(){
        this.$loadingIndicator = document.querySelector('#loadingIndicator');
        this.$loadingError = document.querySelector('#loadingError');
        this.$tabArea = document.querySelector('#tabArea');
        this.$chartArea = document.querySelector('#chartArea');
        this.$experienceChart = document.querySelector('#experienceChart');
        this.$professionChart = document.querySelector('#professionChart');
        this.$ageChart = document.querySelector('#ageChart');
        this.$experienceTab = document.querySelector('#experienceTab');
        this.$professionTab = document.querySelector('#professionTab');
        this.$ageTab = document.querySelector('#ageTab');
            this.statisticsData;
            this.loadData();
            this.addEventListeners();
          
             
    }

    loadData(){
        apiCall('statistics')
        .then(response => {
            console.log(response);
            this.statisticsData = response;
            console.log(this.statisticsData);
            this.$loadingIndicator.classList.add('hidden');
            this.$tabArea.classList.remove('hidden');
            this.$chartArea.classList.remove('hidden');
            // this.loadAge();
            // this.loadExperience();
            // this.loadProfession();
           
        })
        .catch(err => {
            console.log(err);
            this.$loadingIndicator.classList.add('hidden');
            this.$loadingError.classList.remove('hidden');

        } );

    }
    addEventListeners(){
        this.$experienceTab.addEventListener('click', this.loadExperience.bind(this));
        this.$professionTab.addEventListener('click', this.loadProfession.bind(this));
        this.$ageTab.addEventListener('click', this.loadAge.bind(this));

    }
    hideChart(){
        this.$experienceChart.classList.add('hidden');
        this.$professionChart.classList.add('hidden');
        this.$ageChart.classList.add('hidden');
        this.$experienceTab.parentElement.classList.remove('active');
        this.$professionTab.parentElement.classList.remove('active');
        this.$ageChart.parentElement.classList.remove('active')
    }

    loadExperience(event = null) {
        event.preventDefault();
            this.hideChart();
            this.$experienceChart.classList.remove('hidden');
            this.$experienceTab.parentElement.classList.add('active');
            const data = {
            datasets: [{
            data: this.statisticsData.experience,
            backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            ],
            borderColor: [
            'white',
            'white',
            'white',
            ]
            }],
            labels: [
            'Beginner',
            'Intermediate',
            'Advanced'
            ]
            };
            new Chart(this.$experienceChart,{
            type: 'pie',
            data,
            });
            }
    loadProfession(event = null) {
        event.preventDefault();
        this.hideChart();
        this.$professionChart.classList.remove('hidden');
            this.$professionTab.parentElement.classList.add('active');
        const data = {datasets: [{
                data: this.statisticsData.profession,
                backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                'white',
                'white',
                'white',
                'white',
                ]
                }],
                labels: [
                'School Students',
                'College Students',
                'Trainees',
                'Employees'
                ]
                };
                new Chart(this.$professionChart,{
                type: 'pie',
                data,
                });
                }
    loadAge(event=null) {
        this.hideChart();
        event.preventDefault();
        this.$ageChart.classList.remove('hidden');
            this.$ageTab.parentElement.classList.add('active');
        const data = {
        datasets: [{
        data: this.statisticsData.age,
        backgroundColor:[
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
        'white',
        'white',
        'white',
        ]
        }],
        labels: [
        '10-15 years',
        '15-20 years',
        '20-25 years',
        '15-18 years',
        ]
        };
        new Chart(this.$ageChart,{
        type: 'pie',
        data,
        });
        }
}

window.addEventListener('load', ()=>{
    new Status();
})