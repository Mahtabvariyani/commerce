import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProcustForm from "./AddProcustForm";
import NullData from "@/app/components/NullData";

const AddProcust = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    console.log(currentUser)
    return <NullData
    title="OOOoooOOps Access Denied"
    
    />;
  }
  return (
    <div className="p-8 justofy-center">
      <Container>
        <FormWrap>
          <AddProcustForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProcust;
