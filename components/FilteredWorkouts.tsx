import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Workout } from '../app/types' 

type Props = {
  workouts: Workout[]
}

const FilteredWorkouts: React.FC<Props> = ({ workouts }) => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const muscles = ['Shoulders', 'Biceps', 'Legs', 'Back', 'Chest']
  const filteredWorkouts = selectedMuscle ? workouts.filter(workout => workout.muscle === selectedMuscle) : []

  const handleButtonClick = (muscle: string) => {
    setSelectedMuscle(muscle)
    setOpen(true)
  }

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {muscles.map(muscle => (
        <button
          key={muscle}
          onClick={() => handleButtonClick(muscle)}
          className="bg-black text-white m-2 p-2 rounded"
        >
          {muscle}
        </button>
      ))}

      <Transition appear show={open} as="div">
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setOpen(false)}
        >
          <div className="px-4 min-h-screen text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {selectedMuscle} workouts
              </Dialog.Title>

              <div className="mt-2 space-y-4">
                {filteredWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image src={workout.image} alt={workout.name} width={50} height={50} className="rounded-full" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">{workout.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default FilteredWorkouts
