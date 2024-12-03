import BottomSheet from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';

// Thêm vào component
const bottomSheetRef = useRef(null); // Tạo tham chiếu Bottom Sheet
const [selectedPostId, setSelectedPostId] = useState(null);

// Hàm mở Bottom Sheet
const showEditDeleteSheet = (postId) => {
  setSelectedPostId(postId);
  bottomSheetRef.current?.expand(); // Mở Bottom Sheet
};

// Thêm Bottom Sheet vào giao diện
<BottomSheet
  ref={bottomSheetRef}
  snapPoints={['25%', '50%']}
  index={-1} // Ẩn Bottom Sheet lúc đầu
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Edit/Delete Options for Post ID: {selectedPostId}</Text>
    {/* Thêm các nút Edit/Delete ở đây */}
  </View>
</BottomSheet>
