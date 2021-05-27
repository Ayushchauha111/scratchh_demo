import React ,{useState} from 'react'
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import {uuid} from 'uuidv4'
import Sprint from './CatSprite'
const itemsFromBackend =[
    {id:uuid(), content:'move 10 steps',fun:"this.move(10)" },
    {id:uuid(), content:'turn clockwise 15 degree',fun:"this.clock(10)"},
    {id:uuid(), content:'move back 10 steps',fun:"this.!move(10)" },
    {id:uuid(), content:'turn anticlock 15 degree',fun:"this.!clock(10)"},

]

const columnsFromBackend=
    {
        [uuid()]:{
            name:'Sidebar',
            items:itemsFromBackend   // we are returno array of array wrong []
        },
        [uuid()]:{
            name:'MidArea',
            items:[]  // we are returno array of array wrong []
        }
    };
    
    const onDragEnd=(Result,columns,setcolumns)=>{
        
    const {source,destination}=Result;
  
    
    if( source.droppableId!==destination.droppableId )
    {
    const SourceCol=columns[source.droppableId]
    const DestCol=columns[destination.droppableId]
     const Sourceitem=[...SourceCol.items]
     const Destitem=[...DestCol.items]
     const [removed]=Sourceitem.splice(source.index,1);
     Destitem.splice(destination.index,0,removed);
     setcolumns({
         ...columns,
         [source.droppableId]:{
            ...SourceCol,
            items:Sourceitem
        },
         [destination.droppableId]:{
             ...DestCol,
             items:Destitem
         }
     })


    }
    else
    {
        const SourceCol=columns[source.droppableId]
        const Sourceitem=[...SourceCol.items]
        const [removed]=Sourceitem.splice(source.index,1);
        Sourceitem.splice(destination.index,0,removed);
        setcolumns({
            ...columns,
            [source.droppableId]:{
               ...SourceCol,
               items:Sourceitem
           }
            
        })
    }
    
    }


    
export default function Side()
{
    //initial state

    const[columns,setcolumns]=useState(columnsFromBackend)
   
    return(
        <div className=" flex flex-row" >
        
        <div style={{display:'flex',justifyContent:'center',height:'100%'}}>
            <DragDropContext onDragEnd={Result=>onDragEnd(Result,columns,setcolumns)}>
              {Object.entries(columns).map(([id,column])=>{
                  return (
                      <div style={{display:'flex', flexDirection:'column' ,alignItems:'center'}}>
                        <h2>{column.name}</h2>
                        <div style={{}}>
                      <Droppable droppableId={id} key={id}>
                      {(provided,snapshot)=>{
                          return (
                              <div 
                              {...provided.droppableProps}
                               ref={provided.innerRef}
                              style={{ background: snapshot.isDraggingOver,
                              padding:4,width:250,minHeight:500}}
                              >
            {column.items.map((item,index)=>{
                return(
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided,snapshot)=>{
                            return (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={
                                    {
                                        userSelect:'none',
                                        padding:2,
                                        margin: '0 0 0 0',
                                        backgroundColor: snapshot.isDragging,
                                        ...provided.draggableProps.style

                                    }
                                }
                                
                                >
                                    <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {item.content}
      </div>

                                </div>
                            )
                        }}
                    </Draggable>
                )
            })}
             {provided.placeholder}
                              </div>
                          )
                      }}

                      </Droppable>
                      </div>
                        
                      </div>
                  )
              })}
            </DragDropContext>

        </div>
        <div className="flex-none h-full overflow-y-auto p-2" >
            
        <Sprint item={columns}/>
        </div>
        </div>
        
    )
}