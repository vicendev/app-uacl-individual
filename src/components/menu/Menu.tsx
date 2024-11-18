import data from '../../data/data.json'

import MenuItem from './MenuItem';

export default function Menu() {
  return (
    <menu className="flex bg-indigo-300 mt-10 w-2/3 mx-auto justify-center rounded-lg">
      <div className="flex-col">
        {data.apps.map((item, index) => (
          <div className="py-5">
            <MenuItem key={index} appName={item.appName} route={item.route} />
          </div>
        ))}
      </div>
    </menu>
  )
}