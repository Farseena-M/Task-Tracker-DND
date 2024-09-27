import { Button } from "./Button"
import { items } from "./Types/Utils"
type ItemList = {
    items: items[]
    handleEdit: (id: string, title: string) => void
    handleDelete: (id: string) => void
}

export const ItemList = ({ items, handleEdit ,handleDelete }: ItemList) => {
 
    return (
        items.map((data) => (
            <div key={data._id} className="flex justify-between items-center border border-slate-600 pl-2 mb-2 mr-1 py-2">
                <p>{data.title}</p>
                <div className="flex space-x-4">
                    <Button onClick={() => handleEdit(data._id, data.title)} className="text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="blue" viewBox="0 0 24 24">
                            <path d="M3 17.25V21h3.75l12-12-3.75-3.75-12 12H3zm16.5-12l-1.5 1.5 3.75 3.75 1.5-1.5-3.75-3.75z" />
                        </svg>
                    </Button>
                    <Button onClick={() => handleDelete(data._id)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" viewBox="0 0 24 24">
                            <path d="M3 6h18v2H3V6zm3 4v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10H6zm6-6a1 1 0 0 1 1 1v1H7V5a1 1 0 0 1 1-1h4zm-2 3v12H9V7h1zm4 0v12h-1V7h1z" />
                        </svg>
                    </Button>
                </div>
            </div>
        ))
    )
}
