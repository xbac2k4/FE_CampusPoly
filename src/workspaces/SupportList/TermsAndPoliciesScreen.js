import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import color from '../../constants/Color';
import styles from '../../assets/style/support';
const TermsAndPoliciesScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1}}>
      <ScrollView style={[styles.container]}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
            <Image
              source={require('../../assets/images/arowleft.png')}
              resizeMode="contain"
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <View style={styles.barHeader}>
            <Text style={styles.textHeader}>Điều khoản và chính sách</Text>
            <View style={{ height: 2, backgroundColor: '#fff' }} />
          </View>
        </View>
        {/* Nội dung */}
        <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
          <Text style={[styles.textHeader, { fontSize: 24 }]}>Điều khoản dịch vụ</Text>
          <View style={{ width: 'auto', height: 90, backgroundColor: '#edeff4', alignContent: 'center', borderRadius: 15, marginTop: 10 }}>
            <Text style={[styles.texthp, { color: '#000', padding: 10 }]}>Chúng tôi đang cập nhật Điều khoản dịch vụ của CampusPoly. Nội dung cập nhật này sẽ có hiệu lực kể từ ngày 01/09/2024. Đọc Điều khoản mới.</Text>
          </View>
          <Text style={styles.texthp}>CampusPoly tạo ra các công nghệ và dịch vụ nhằm hỗ trợ mọi người kết nối với nhau, xây dựng cộng đồng cũng như phát triển doanh nghiệp. Các Điều khoản này điều chỉnh việc bạn sử dụng các sản phẩm, tính năng, ứng dụng, dịch vụ, công nghệ cũng như phần mềm khác mà chúng tôi cung cấp <Text style={{ color: '#4267b2' }}>(Sản phẩm của CampusPoly hoặc Sản phẩm)</Text>, trừ khi chúng tôi nêu rõ là áp dụng các điều khoản riêng (và không áp dụng các điều khoản này). Các Sản phẩm này do CampusPoly cung cấp cho bạn.</Text>
          <Text style={styles.texthp}>Bạn không mất phí sử dụng CampusPoly hay các sản phẩm và dịch vụ khác thuộc phạm vi điều chỉnh của những Điều khoản này, trừ khi chúng tôi có quy định khác. Thay vào đó, doanh nghiệp, tổ chức và những cá nhân khác sẽ phải trả tiền cho chúng tôi để hiển thị quảng cáo về sản phẩm và dịch vụ của họ cho bạn. Khi sử dụng Sản phẩm của chúng tôi, bạn đồng ý để chúng tôi hiển thị quảng cáo mà chúng tôi cho rằng có thể phù hợp với bạn và sở thích của bạn. Chúng tôi sử dụng dữ liệu cá nhân của bạn để xác định những quảng cáo được cá nhân hóa sẽ hiển thị cho bạn.</Text>
          <Text style={styles.texthp}>Chúng tôi không bán dữ liệu cá nhân của bạn cho các nhà quảng cáo, cũng không chia sẻ thông tin trực tiếp nhận dạng bạn (chẳng hạn như tên, địa chỉ email hoặc thông tin liên hệ khác) với những đơn vị này, trừ khi được bạn cho phép cụ thể. Thay vào đó, các nhà quảng cáo có thể cho chúng tôi biết những thông tin như kiểu đối tượng mà họ muốn hiển thị quảng cáo và chúng tôi sẽ hiển thị những quảng cáo ấy cho người có thể quan tâm. Chúng tôi cho nhà quảng cáo biết hiệu quả quảng cáo để những đơn vị này nắm được cách mọi người tương tác với nội dung của họ. Hãy xem Mục 2 ở bên dưới để hiểu rõ hơn cách chúng tôi hiển thị quảng cáo được cá nhân hóa trên Sản phẩm của CampusPoly theo các điều khoản này.</Text>
          <Text style={styles.texthp}><Text style={{ color: color.textBlod }}>Chính sách quyền riêng tư</Text> của chúng tôi giải thích cách chúng tôi thu thập và sử dụng dữ liệu cá nhân của bạn để xác định sẽ hiển thị quảng cáo nào cho bạn, cũng như để cung cấp tất cả các dịch vụ khác được mô tả bên dưới. Bạn cũng có thể chuyển đến trang cài đặt trên Sản phẩm có liên quan của CampusPoly bất cứ lúc nào để xem các lựa chọn mình có về quyền riêng tư đối với cách chúng tôi sử dụng dữ liệu của bạn.</Text>
          {/* Danh sách điều khoản */}
          <Text style={[styles.textHeader, { marginTop: 10, color: '#6ca0b6' }]}>1. Dịch vụ chúng tôi cung cấp </Text>
          <Text style={styles.texthp}>Sứ mệnh của chúng tôi là đem đến cho mọi người khả năng xây dựng cộng đồng và đưa thế giới lại gần nhau hơn. Nhằm thúc đẩy sứ mệnh này, chúng tôi cung cấp các Sản phẩm và dịch vụ được mô tả dưới đây cho bạn:</Text>
          <Text style={styles.texthp}><Text style={{ fontWeight: 'bold' }}>Mang lại trải nghiệm dành riêng cho bạn:</Text>
            Trải nghiệm của bạn trên CampusPoly không giống với của bất kỳ ai khác: từ các bài viết, tin, sự kiện, quảng cáo và nội dung khác mà bạn nhìn thấy trên các nền tảng của chúng tôi cho đến các Trang CampusPoly bạn theo dõi cùng những tính năng khác mà bạn có thể sử dụng (chẳng hạn như Marketplace) và tìm kiếm. Ví dụ: chúng tôi sử dụng dữ liệu về các kết nối bạn tạo, các lựa chọn và chế độ cài đặt bạn chọn, những gì bạn chia sẻ cũng như thực hiện trên và ngoài Sản phẩm của chúng tôi để đem đến trải nghiệm dành riêng cho bạn.</Text>
          <Text style={styles.texthp}><Text style={{ fontWeight: 'bold' }}>Kết nối bạn với những người và tổ chức mà bạn quan tâm:</Text>
            Chúng tôi hỗ trợ bạn tìm và kết nối với mọi người những đối tượng khác quan trọng với bạn trên các Sản phẩm của CampusPoly mà bạn sử dụng. Chúng tôi sử dụng dữ liệu để gợi ý cho bạn và những người khác, chẳng hạn như nhóm nên tham gia, sự kiện nên tham dự, Trang CampusPoly nên theo dõi hoặc gửi tin nhắn, chương trình nên xem và những người mà bạn có thể muốn kết bạn. Những mối quan hệ khăng khít hơn sẽ tạo ra các cộng đồng gắn bó hơn và chúng tôi tin rằng dịch vụ của mình hữu ích nhất khi mọi người được kết nối với nhau, cũng như với các nhóm và tổ chức mà họ quan tâm.</Text>
          <Text style={styles.texthp}><Text style={{ fontWeight: 'bold' }}>Hỗ trợ bạn khám phá nội dung, sản phẩm và dịch vụ mà bạn có thể quan tâm:</Text>
            Chúng tôi hiển thị cho bạn các quảng cáo được cá nhân hóa, ưu đãi và nội dung thương mại hoặc được tài trợ khác để bạn có thể khám phá nội dung, sản phẩm cũng như dịch vụ do nhiều doanh nghiệp, tổ chức sử dụng CampusPoly và các Sản phẩm khác của CampusPoly cung cấp. Mục 2 bên dưới sẽ giải thích chi tiết hơn về điều này. </Text>
          <Text style={styles.texthp}>Tăng cường tính an toàn, bảo mật và toàn vẹn cho các dịch vụ của chúng tôi, chống lại hành vi có hại cũng như bảo vệ cộng đồng người dùng:</Text>
          {/* Danh sách điều khoản2 */}
          <Text style={[styles.textHeader, { marginTop: 10, color: '#6ca0b6' }]}>2. Cam kết của bạn với CampusPoly và cộng đồng của chúng tôi </Text>
          <Text style={styles.texthp}>Chúng tôi cung cấp các dịch vụ này cho bạn và cộng đồng để thúc đẩy sứ mệnh của mình. Để đổi lại, chúng tôi cần bạn thực hiện các cam kết sau:

          </Text>
          <Text style={styles.texthp}>1:Những đối tượng có thể sử dụng CampusPoly Khi mọi người chia sẻ ý kiến và hành động, cộng đồng của chúng ta sẽ trở nên an toàn và có trách nhiệm hơn. Vì lý do đó, bạn:

            Phải đặt cho tài khoản đúng tên mà bạn sử dụng trong cuộc sống hàng ngày.
            Phải cung cấp thông tin chính xác về bản thân.
            Chỉ được tạo một tài khoản (của riêng bạn) và sử dụng cho mục đích cá nhân.
            Không được chia sẻ mật khẩu, cấp cho người khác quyền truy cập vào tài khoản CampusPoly của bạn hoặc chuyển giao tài khoản của bạn cho bất kỳ ai (khi chúng tôi chưa cho phép).
            Chúng tôi luôn cố gắng cung cấp CampusPoly rộng rãi cho mọi người. Tuy nhiên, bạn sẽ không thể sử dụng CampusPoly nếu:

            Chưa đủ 13 tuổi.
            Là tội phạm tình dục bị kết án.
            Từng bị chúng tôi vô hiệu hóa tài khoản do vi phạm các Điều khoản, Tiêu chuẩn cộng đồng hoặc các điều khoản và chính sách khác mà chúng tôi áp dụng cho việc sử dụng CampusPoly.</Text>
          <Text style={styles.texthp}>2:Những điều bạn có thể chia sẻ và thực hiện trên CampusPoly Chúng tôi muốn mọi người sử dụng CampusPoly để thể hiện bản thân và chia sẻ nội dung quan trọng, nhưng không phải với cái giá là sự an toàn và vui khỏe của người khác hay tính toàn vẹn của cộng đồng. Do đó, bạn đồng ý không tham gia vào những hành vi được mô tả dưới đây:

            Không tạo hoặc chia sẻ bất kỳ nội dung nào vi phạm Điều khoản, Tiêu chuẩn cộng đồng hoặc các chính sách khác của CampusPoly.
            Không chia sẻ nội dung bất hợp pháp, gây hiểu nhầm, phân biệt đối xử hoặc lừa đảo.
            Không tải lên virus, mã độc hại, gửi spam hay làm bất cứ điều gì có thể vô hiệu hóa hoặc gây ảnh hưởng tiêu cực đến hoạt động của CampusPoly.
            Không truy cập hoặc thu thập dữ liệu từ CampusPoly bằng phương tiện tự động mà chưa được chúng tôi cho phép.</Text>
          <Text style={[styles.texthp,{marginBottom:60}]}>3:Các giới hạn về việc sử dụng tài sản trí tuệ của chúng tôi

            Nếu bạn sử dụng nội dung thuộc quyền sở hữu trí tuệ của chúng tôi (ví dụ: hình ảnh, thiết kế, video hoặc âm thanh), chúng tôi sẽ giữ lại tất cả các quyền đối với nội dung đó, nhưng bạn chỉ có thể sử dụng các tài sản này khi được phép rõ ràng theo nguyên tắc của CampusPoly.</Text>

        </View>

      </ScrollView>
    </View>
  )
}

export default TermsAndPoliciesScreen
