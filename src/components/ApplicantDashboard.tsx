import React, { useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { BACKEND_API_URL } from '../config/backend';

const ApplicantDashboard: React.FC = () => {

    const [jobs, setJobs] = React.useState([]);

    useEffect(() => {
        getAllJobs();
    }, []);

    const getAllJobs = async () => {
        try {
            const response = await axios(`${BACKEND_API_URL}/api/jobs`);
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const apply = async (jobId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, please login first.');
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_API_URL}/api/applications/apply/${jobId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Error applying for job:', error);
            alert('Failed to apply for the job. Please try again later.');
        }
    }

    return (
        <>
            <Navbar />
            <h1>Applicant Dashboard</h1>
            <div className="container">
                <div className="row">
                    {
                        jobs.map((job, index) => (
                            <div className="col-md-4" key={index} >
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h4 className="card-title">{job.title}</h4>
                                        <p className="card-text">{job.description}</p>
                                        <p><strong>Company:</strong> {job.company}</p>
                                        <p><strong>Posted Date:</strong> {job.postedDate}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-primary" onClick={() => apply(job.id)}>Apply</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default ApplicantDashboard;