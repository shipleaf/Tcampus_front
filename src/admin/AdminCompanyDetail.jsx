import React, { useState } from 'react';
import styled from 'styled-components';
import { postCompanyDetails } from '../APIs/adminAPI';
import { Link } from 'react-router-dom';

const AdminCompanyDetail = () => {
    const [companyDetails, setCompanyDetails] = useState({
        companyName: '',
        establish: '',
        logo: '',
        pic1: '',
        pic2: '',
        pic3: '',
        pic4: '',
        pic5: '',
        body: '',
        track: '',
        stack: '',
        welfare: '',
        salary: '',
        location: '',
        employee: '',
        link: '',
        revenue: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyDetails({
            ...companyDetails,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postCompanyDetails(companyDetails);
            if (response.status >= 200 && response.status < 300) {
                alert('데이터 전송 성공: ' + response.data.message);
            } else {
                alert('데이터 전송 실패: ' + response.status);
            }
        } catch (error) {
            alert('데이터 전송 실패: ' + error.message);
        }
    };

    return (
        <FormContainer>
            <Header>
                <LinkButton to="/admin">뒤로 가기</LinkButton>
            </Header>
            <h1>기업상세 추가</h1>
            <form onSubmit={handleSubmit} autoComplete="off">
                {Object.keys(companyDetails).map((key) => (
                    <FormRow key={key}>
                        <label>{key}</label>
                        <input
                            type={key.includes('date') ? 'date' : 'text'}
                            name={key}
                            value={companyDetails[key]}
                            onChange={handleChange}
                        />
                    </FormRow>
                ))}
                <SubmitButton type="submit">추가</SubmitButton>
            </form>
        </FormContainer>
    );
};

export default AdminCompanyDetail;

const FormContainer = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
`

const Header = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
`

const FormRow = styled.div`
    margin-bottom: 10px;

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
`

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`

const LinkButton = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: black;
    color: white;
    text-decoration: none;

`
