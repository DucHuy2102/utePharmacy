import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const News = () => {
    return (
        <>
            <Header />
            <Container>
                <Posts>
                    <Post>
                        <Img src='https://cdn.nhathuoclongchau.com.vn/unsafe/860x456/https://cms-prod.s3-sgn09.fptcloud.com/vac_xin_thuong_han_la_gi_can_tiem_may_mui_vac_xin_thuong_han_0_e5fe17cc06.jpg' />
                        <Content>
                            <Title>Vắc xin thương hàn là gì? Cần tiêm mấy mũi vắc xin thương hàn?</Title>
                            <Date>17-10-2023</Date>
                            <Description>
                                Vắc xin thương hàn chính là phương pháp phòng tránh bệnh thương hàn an toàn và hiệu quả
                                nhất. Vì thể mỗi người cần có ý thức tiêm ngừa sớm để bảo vệ sức khỏe bản thân. Bài viết
                                dưới đây sẽ cung cấp đến bạn một số thông tin về vắc xin thương hàn.
                            </Description>
                            <TagsPost>
                                <TagItem>#Tiêm chủng</TagItem>
                                <TagItem>#Tin tức sức khỏe</TagItem>
                            </TagsPost>
                        </Content>
                    </Post>
                    <Post>
                        <Img src='https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/nhung_dieu_can_biet_ve_dau_moi_vai_gay_va_co_cung_do_vi_dau_moi_vai_gay_0dea172294.jpg' />
                        <Content>
                            <Title>
                                Cổ cứng đờ vì đau mỏi vai gáy: Nguyên nhân, cách chẩn đoán và điều trị như thế nào?
                            </Title>
                            <Date>20-10-2023</Date>
                            <Description>
                                Đau mỏi vai gáy là tình trạng rối loạn cơ xương khá phổ biến hiện nay và cổ cứng đờ vì
                                đau mỏi vai gáy là dấu hiệu cảnh báo nhiều bệnh lý cột sống nguy hiểm. Vậy bạn hiểu gì
                                về tình trạng đau mỏi vai gáy và cổ cứng đờ vì đau mỏi vai gáy?
                            </Description>
                            <TagsPost>
                                <TagItem>#Tin tức sức khỏe</TagItem>
                                <TagItem>#Cơ - Xương - Khớp</TagItem>
                            </TagsPost>
                        </Content>
                    </Post>
                    <Post>
                        <Img src='https://cdn.nhathuoclongchau.com.vn/unsafe/343x201/https://cms-prod.s3-sgn09.fptcloud.com/goi_y_thuc_don_eat_clean_7_ngay_cho_ban_0_edfeb04703.jpg' />
                        <Content>
                            <Title>Gợi ý thực đơn eat clean 7 ngày cho bạn</Title>
                            <Date>20-10-2023</Date>
                            <Description>
                                Eat clean, hay còn gọi là "ăn sạch", là một chế độ ăn uống tập trung vào việc lựa chọn
                                và chế biến thực phẩm một cách lành mạnh. Vậy bạn đã biết cách xây dựng thực đơn eat
                                clean cho mình chưa. Dưới đây là thực đơn eat clean 7 ngày các bạn có thể tham khảo nhé!
                            </Description>
                            <TagsPost>
                                <TagItem>#Dinh dưỡng</TagItem>
                                <TagItem>#Khỏe đẹp</TagItem>
                                <TagItem>#Chăm sóc cơ thể</TagItem>
                            </TagsPost>
                        </Content>
                    </Post>
                    <Post>
                        <Img src='https://cdn.nhathuoclongchau.com.vn/unsafe/400x225/https://cms-prod.s3-sgn09.fptcloud.com/Uong_gi_tieu_mo_noi_tang_3_ab8270078a.jpg' />
                        <Content>
                            <Title>Uống gì tiêu mỡ nội tạng? Một số nước uống giảm mỡ nội tạng hiệu quả</Title>
                            <Date>12-09-2023</Date>
                            <Description>
                                Uống gì tiêu mỡ nội tạng nhanh chóng, mà lại không gây ra tác dụng phụ cho cơ thể? Trà
                                chanh mật ong, trà quế, nước ép lựu, nước dưa chuột,... là những đồ uống giảm mỡ tốt mà
                                bạn có thể tham khảo.
                            </Description>
                            <TagsPost>
                                <TagItem>#Dinh dưỡng</TagItem>
                                <TagItem>#Khỏe đẹp</TagItem>
                                <TagItem>#Chăm sóc cơ thể</TagItem>
                            </TagsPost>
                        </Content>
                    </Post>
                    <Post>
                        <Img src='https://cdn.nhathuoclongchau.com.vn/unsafe/400x225/https://cms-prod.s3-sgn09.fptcloud.com/goc_giai_dap_dau_mat_do_co_an_duoc_thit_ga_khong_5_Cropped_fdc7d02a4a.jpg' />
                        <Content>
                            <Title>Đau mắt đỏ có ăn được thịt gà không? Loại thực phẩm nào nên kiêng?</Title>
                            <Date>19-11-2023</Date>
                            <Description>
                                "Đau mắt đỏ có ăn được thịt gà không?" là vấn đề dinh dưỡng được nhiều người bệnh quan
                                tâm, vì nếu sử dụng các thực phẩm không hợp lý thì bệnh sẽ lâu phục hồi và để lại nhiều
                                biến chứng nguy hiểm cho “cửa sổ tâm hồn”.
                            </Description>
                            <TagsPost>
                                <TagItem>#Dinh dưỡng</TagItem>
                                <TagItem>#Bệnh về mắt</TagItem>
                            </TagsPost>
                        </Content>
                    </Post>
                    <Post>
                        <Img src='https://cdn.nhathuoclongchau.com.vn/unsafe/400x225/https://cms-prod.s3-sgn09.fptcloud.com/cach_cai_thien_kha_nang_hap_thu_chat_sat_doi_voi_tre_bi_thieu_mau_5_Cropped_a0862c8d85.png' />
                        <Content>
                            <Title>Cách cải thiện khả năng hấp thụ chất sắt đối với trẻ bị thiếu máu</Title>
                            <Date>09-10-2023</Date>
                            <Description>
                                Các triệu chứng thiếu sắt thiếu máu ở trẻ em ngày càng phổ biến hơn khi các bậc phụ
                                huynh không chú trọng vào chế độ dinh dưỡng mỗi ngày của trẻ, dẫn đến cơ thể không được
                                cung cấp đủ chất sắt đáp ứng nhu cầu tạo hemoglobin - đóng vai trò vận chuyển oxy cho tế
                                bào hồng cầu trong máu.
                            </Description>
                            <TagsPost>
                                <TagItem>#Dinh dưỡng</TagItem>
                                <TagItem>#Trẻ em</TagItem>
                            </TagsPost>
                        </Content>
                    </Post>
                </Posts>
                <Tags>
                    <TagItem>#Tiêm chủng</TagItem>
                    <TagItem>#Dinh dưỡng</TagItem>
                    <TagItem>#Khỏe đẹp</TagItem>
                    <TagItem>#Chăm sóc cơ thể</TagItem>
                    <TagItem>#Tin tức sức khỏe</TagItem>
                    <TagItem>#Giảm cân</TagItem>
                    <TagItem>#Cơ - Xương - Khớp</TagItem>
                    <TagItem>#Trẻ em</TagItem>
                </Tags>
            </Container>
            <Footer />
        </>
    );
};

const Container = styled.div`
    width: 80%;
    margin: 40px auto;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 1024px) {
        width: 100%;
    }
`;

const Post = styled.div`
    border: 1px solid #f1f1f1;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    cursor: pointer;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;
const Posts = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const Tags = styled.div`
    width: 25%;
    // background-color: #f5f7ff;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    padding-top: 0px;
    height: fit-content;
    box-shadow: 0 1px 0.9px #ccc;
    @media (max-width: 768px) {
        display: none;
    }
`;

const TagItem = styled.div`
    border: 1px solid gray;
    border-radius: 5px;
    width: fit-content;
    padding: 0 5px;
    margin: 5px;
    margin-left: 0;
    margin-bottom: 0;
    :hover {
        background-color: white;
        color: black;
        cursor: pointer;
    }
`;

const Title = styled.div`
    color: #427ef5;
    font-weight: bold;
    font-size: 24px;
    @media (max-width: 768px) {
        font-size: 18px;
    }
`;
const Description = styled.div`
    color: gray;
    @media (max-width: 768px) {
        height: 50px;
        overflow: hidden;
    }
`;
const Img = styled.img`
    width: 30%;
`;

const TagsPost = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: 0px;
    height: fit-content;
    width: 100%;
    color: gray;
`;
const Date = styled.div`
    color: gray;
    margin-bottom: 5px;
`;
export default News;
