import React from 'react';
import * as S from './ExplanationPage.styled';
import Layout from '../layout/Layout';
import Button from '../components/Button';
import ServiceExplanation from '../components/ServiceExplanation';
import SchoolShape2 from '../assets/images/school-shape2.png';
import Example from '../assets/images/example.png';
import { useNavigate } from 'react-router-dom';

const ExplanationPage = () => {
    const navigate = useNavigate();
    
    return (
        <S.Wrapper>
            <Layout>
                <S.SchoolShape src={SchoolShape2}/>
                <S.Title>Unlock the Final Chapter</S.Title>
                <S.ContentWrapper>
                    <S.Example src={Example} />
                    <S.ExplanationWrapper>
                        <ServiceExplanation 
                            title="나의 학교, 성신"
                            desc={`추억이 머무는 그곳,\n
                                성신여자 대학교 캠퍼스를\n
                                그대로 담았습니다`}
                        />
                        <ServiceExplanation 
                            title="나, 그대로"
                            desc={`진짜 나를 앨범에 담아\n
                                이때의 나를\n
                                기억할 수 있습니다`}
                        />
                        <ServiceExplanation 
                            title="마지막 교복"
                            desc={`성신인의 보라빛 학사복,\n
                                언제든 다시\n
                                입을 수 있어요`}
                        />
                        <ServiceExplanation 
                            title="언제 어디서나"
                            desc={`시간도 장소도 상관없이,\n
                                단 한 번의 졸업을\n
                                다시 꺼내보세요`}
                        />
                    </S.ExplanationWrapper>
                </S.ContentWrapper>
                <Button text="NEXT" onClick={() => navigate('/camera')}/>
            </Layout>
        </S.Wrapper>
    )
}

export default ExplanationPage
