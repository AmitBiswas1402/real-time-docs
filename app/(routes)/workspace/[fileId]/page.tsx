import Editor from "../_components/Editor"
import WorkSpaceHeader from "../_components/WorkSpaceHeader"

const WorkSpace = () => {
  return (
    <div>
        <WorkSpaceHeader />

        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-screen">
                <Editor />
            </div>
            <div className="bg-purple-300 h-screen">
                Can 
            </div>

        </div>
    </div>
  )
}
export default WorkSpace