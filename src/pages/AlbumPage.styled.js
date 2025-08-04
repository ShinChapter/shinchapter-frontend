import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Page = styled.div`
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    user-select: none;
    box-sizing: border-box;
    border: 1px solid #ccc;
`

export const BookCoverWrapper = styled.div`
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
`

export const MoonIcon = styled.img`
    width: 60px;
    position: absolute;
    right: 50px;
    top: 50px;
`

export const BookCoverTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 140px;
`

export const TitleImage = styled.img`
    width: 440px;
    margin-bottom: 8px;
`

export const Desc = styled.h2`
    font-size: 20px !important;
    ${({ theme }) => theme.fonts.GrandifloraOne};
    color: #FFFFFF;
`

export const SchoolName = styled.h4`
    font-size: 24px;
    ${({ theme }) => theme.fonts.IVMSemiBold};
    color: #FFFFFF;
    margin-bottom: 50px;
`

export const FriendProfilePage = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
    padding: 100px 10px;
`

export const FriendProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`

export const FriendImageWrapper = styled.div`
    width: 160px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.backgroundColor ? "#DECAEF" : "FFFFFF"};
`

export const FriendImage = styled.img`
    width: 160px;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
    object-position: top;
`

export const FriendName = styled.p`
    font-size: 20px;
    line-height: 30px;
`

export const AlbumPage = styled.div`
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
`

export const BigAlbum1 = styled.img`
    width: 390px;
    height: 260px;
    object-fit: cover;
    border-radius: 20px;
    position: absolute;
    top: 30px;
    right: 60px;
`

export const BigAlbum2 = styled.img`
    width: 390px;
    height: 260px;
    object-fit: cover;
    border-radius: 20px;
    position: absolute;
    bottom: 60px;
    left: 70px;
`

export const AlbumTitleBlur = styled.div`
    width: 380px;
    height: 70px;
    filter: blur(20px);
    background-color: #6D6AB1;
    position: absolute;
    left: 0%;
    top: 50%;
    transform: translate(-50%, -50%);
`

export const AlbumTitle = styled.h1`
    color: #FFFFFF;
    ${({ theme }) => theme.fonts.PressStart2P};
    font-size: 30px;
    position: absolute;
    left: 0%;
    top: 50%;
    transform: translate(-50%, -50%);
`

export const SmallAlbum1 = styled.img`
    width: 300px;
    height: 210px;
    object-fit: cover;
    border-radius: 20px;
    position: absolute;
    top: 40px;
    left: 70px
`

export const SmallAlbum2 = styled.img`
    width: 300px;
    height: 210px;
    object-fit: cover;
    border-radius: 20px;
    position: absolute;
    top: 270px;
    right: 60px
`

export const SmallAlbum3 = styled.img`
    width: 300px;
    height: 210px;
    object-fit: cover;
    border-radius: 20px;
    position: absolute;
    bottom: 40px;
    left: 70px;
`