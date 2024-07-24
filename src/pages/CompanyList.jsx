import React, { useState, useEffect } from "react";
import { fetchCompany } from "../APIs/companyAPI";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GuestHeader from "../components/header/GuestHeader";
import Top from "../components/post/Top";
import CompanyPost from "../components/post/CompanyPost";
import CustomSelect from "../components/filter/CustomSelect";

function CompanyList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('company');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const postsPerPage = 7;

    useEffect(() => {
        const getCompanies = async () => {
            try {
                const data = await fetchCompany();
                setPosts(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getCompanies();
    }, []);

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortOption === 'scrap') {
            return sortOrder === 'desc' ? b.scrap - a.scrap : a.scrap - b.scrap;
        } else if (sortOption === 'company') {
            return sortOrder === 'desc' ? b.company.localeCompare(a.company) : a.company.localeCompare(b.company);
        }
        return 0;
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (value) => {
        setSortOption(value);
        setCurrentPage(1);
    };

    const handleSortOrderChange = (value) => {
        setSortOrder(value);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    return (
        <>
            <GuestHeader />
            <Top title='정부 지원' />
            <SortContainer>
                <Right>
                    <CustomSelect
                        selectedOption={sortOption}
                        options={[
                            { value: "scrap", label: "스크랩" },
                            { value: "company", label: "가나다 순" }
                        ]}
                        onOptionSelect={handleSortChange}
                    />
                    <CustomSelect
                        selectedOption={sortOrder}
                        options={[
                            { value: "desc", label: "내림차순" },
                            { value: "asc", label: "오름차순" }
                        ]}
                        onOptionSelect={handleSortOrderChange}
                    />
                </Right>
            </SortContainer>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>회사 정보 불러오기 실패: {error.message}</p>
            ) : (
                <>
                    {currentPosts.map((post) => (
                        <StyledLink key={post.key} to={`/companydetails/${post.key}`}>
                            <CompanyPost {...post} />
                        </StyledLink>
                    ))}
                    <Pagination>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PageNumber
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                active={index + 1 === currentPage}
                            >
                                {index + 1}
                            </PageNumber>
                        ))}
                    </Pagination>
                </>
            )}
        </>
    );
}

export default CompanyList;

const SortContainer = styled.div`
    display: flex;
    width: 60%;
    margin: 20px auto;
    margin-bottom: 40px;
    align-items: center;
`

const Right = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`

const PageNumber = styled.button`
    background: ${(props) => (props.active ? '#36bef1' : '#fff')};
    border: 1px solid #ddd;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background: #36bef1;
        color: #fff;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:hover {
        text-decoration: none;
    }
`
