import { styled } from 'styled-components';

// 메타버스
export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: #0b0f14;
    overflow: hidden;
`

export const LocationWrapper = styled.div`
    position: relative;
    height: 46px;
    width: 340px;
    margin-bottom: 30px;
`

export const BlurLayer = styled.div`
    position: absolute;
    inset: 0;
    background-color: rgba(86, 23, 138, 0.66);
    filter: blur(15px);
    border-radius: 50%;
`

export const Location = styled.h3`
    ${({ theme }) => theme.fonts.Galmuri7};
    font-size: 32px;
    color: #FFFFFF;
    position: relative;
    z-index: 1;
    text-align: center;
    line-height: 46px;
`

export const IconWrapper = styled.div`
    position: absolute;
    top: 30px;
    right: 50px;
    z-index: 10;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
`

export const CameraIcon = styled.img`
    width: 70px;
    height: 70px;
    cursor: pointer;
    margin-bottom: 30px;
`

export const Icon = styled.img`
    width: 70px;
    height: 70px;
    cursor: pointer;
`

export const DropdownIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    flex-direction: column;
    border-radius: 10px;
    gap: 15px;
    width: 70px;
    padding: 18px 0;
`

export const UpIcon = styled.img`
    width: 50px;
    cursor: pointer;
`

export const BuildingIcon = styled.img`
    width: 60px;
    height: 60px;
    cursor: pointer;
`

// 사진 촬영
export const PhotoWrapper = styled.div`
    background-color: #000000;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

export const PhotoCanvas = styled.div`
    width: 90%;
    height: 700px;
    background-color: #3f3f3f;
`

export const ColumnIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 90%;
    margin-left: 30px;
`

export const CloseIcon = styled.img`
    width: 70px;
    height: 70px;
    cursor: pointer;
`

export const CameraIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
`

export const filmedImage = styled.div`
    width: 70px;
    height: 70px;
    position: relative;
`

export const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
`

export const ImageNum = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }) => theme.fonts.Galmuri};
    font-size: 24px;
    position: absolute;
    top: -20px;
    right: -20px;
`

export const EmptyImage = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #282828;
`

export const PoseIcon = styled.img`
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid #FFFFFF;
    width: 60px;
    height: 60px;
    padding: 5px;

    &:hover {
        border: 2px solid #000000;
    }
`

export const ButtonWrapper = styled.button`
    position: absolute;
    bottom: 45px;
    right: 45px;
    border-radius: 35px;
`