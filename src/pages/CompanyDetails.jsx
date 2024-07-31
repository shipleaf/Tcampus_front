import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCompanyDetails } from '../APIs/companyAPI';
import styled from 'styled-components';
import GuestHeader from '../components/modules/header/GuestHeader';
import UserHeader from '../components/modules/header/UserHeader';
import CompanyHeader from '../components/modules/company/CompanyHeader';
import ScrapButtonDiv from '../components/modules/recruit/ScrapButtonDiv';
import CompanyPost from '../components/post/CompanyPost';
import { loginState } from '../state/atoms';
import { useRecoilValue } from 'recoil';

function CompanyDetails() {
    const [companyDetailData, setCompanyDetailData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const isLoggedIn = useRecoilValue(loginState);

    const { key } = useParams();

    useEffect(() => {
        const getCompanyDetails = async () => {
            try {
                const response = await fetchCompanyDetails(key);
                if (response.status >= 200 && response.status < 300) {
                    setCompanyDetailData(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getCompanyDetails();
    }, [key]);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || !companyDetailData) {
        return <p>회사 정보 불러오기 실패: {error.message}</p>;
    }

    const topCompanies = [...companyDetailData.otherCompanies]
        .sort((a, b) => b.companyID - a.companyID)
        .slice(0, 3);

    return (
        <>
            {isLoggedIn ? (
                <UserHeader />
            ) : (
                <GuestHeader />
            )}
            <Container>
                <Title>기업소개</Title>
                <Divder />
                <CompanyHeader data={companyDetailData} />
                <ScrapContainer>
                    <ScrapButtonDiv apiEndpoint={`/api/company/${key}/scrap `}/>
                </ScrapContainer>
                <Section>
                    <SectionTitle>회사 소개</SectionTitle>
                    <SectionContent isExpanded={isExpanded}>
                        {companyDetailData.body.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </SectionContent>
                    <ExpandButton onClick={handleExpandClick}>
                        {isExpanded ? '접기 ▲' : '펼치기 ▼'}
                    </ExpandButton>
                </Section>
                <ImageGallery>
                    <GalleryImage src={companyDetailData.pic1} alt="이미지1" />
                    <GalleryImage src={companyDetailData.pic2} alt="이미지2" />
                    <GalleryImage src={companyDetailData.pic3} alt="이미지3" />
                </ImageGallery>
                <Section>
                    <SectionTitle>복지 및 혜택</SectionTitle>
                    <SectionContent>
                        {companyDetailData.welfare}
                    </SectionContent>
                </Section>
                <Section style={{ marginTop: '100px' }}>
                    <SectionTitle style={{ fontSize: '15px' }}>다른 기업들을 보고싶다면?</SectionTitle>
                </Section>
                <OtherCompany>
                    {topCompanies.map((company) => (
                        <CompanyPostContainer key={company.companyID}>
                            <CompanyPost
                                companyName={company.companyName}
                                stack={company.stack}
                                track={company.track}
                                logo={company.logo}
                                scrapCount={company.scrapCount}
                            />
                        </CompanyPostContainer>
                    ))}
                </OtherCompany>
            </Container>
        </>
    );
}

export default CompanyDetails;

const Container = styled.div`
    width: 60%;
    margin: 20px auto;
    font-family: Arial, sans-serif;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    width: 62%;
    padding: 15px;
    margin-left: 10px;
`

const Divder = styled.div`
    margin: 5px auto;  
    width: 99%;
    height: 2px;
    background-color: black;
`

const ScrapContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    margin: 20px auto;
`

const Section = styled.div`
    margin: 20px 0;
`

const SectionTitle = styled.h2`
    margin: 0 0 10px 0;
    font-size: 20px;
`

const SectionContent = styled.div`
    margin: 10px 0;
    font-size: 16px;
    max-height: ${({ isExpanded }) => (isExpanded ? 'none' : '110px')};
    overflow: hidden;
`

const ExpandButton = styled.button`
    display: block;
    width: 100%;
    height: 50px;
    margin: 10px auto;
    padding: 5px 10px;
    background-color: white;
    font-size: 20px;
    font-weight: bold;
    color: black;
    border: 1px solid #999;
    border-radius: 5px;
    cursor: pointer;
`

const ImageGallery = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`

const GalleryImage = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
`

const OtherCompany = styled.div`
    display: flex;
    flex-direction: column;
`

const CompanyPostContainer = styled.div`
    margin-bottom: -20px; 
`
