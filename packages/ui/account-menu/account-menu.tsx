import React from 'react'
import { Form, useLocation } from '@remix-run/react'
import * as AriaKit from 'ariakit'

import { useUser } from '../utils'
import { Icon, Avatar, Text } from '../'

export const AccountMenu = () => {
	const user = useUser()
	const location = useLocation()
	const popover = AriaKit.usePopoverState()

	return (
		<>
			<AriaKit.PopoverDisclosure
				state={popover}
				className="relative flex w-full cursor-pointer select-none items-center rounded-full p-3.5 transition-colors hover:bg-gray-100 active:bg-gray-200"
			>
				<Avatar
					size="sm"
					className="pointer-events-none sm:h-12 sm:w-12"
					src={user.avatarUrl}
					alt={user.username}
				/>
				<div className="hidden flex-auto items-center justify-between xl:flex">
					<div className="text-start mx-3.5 flex flex-col text-lg">
						<Text weight={7} className="leading-tight">
							{user.name}
						</Text>
						<Text color="gray" className="leading-tight">
							{`@${user.username}`}
						</Text>
					</div>
					<Icon name="dots" size="md" />
				</div>
			</AriaKit.PopoverDisclosure>
			<AriaKit.Popover state={popover}>
				<div className="w-72 drop-shadow-lg group-hover:block">
					<AriaKit.PopoverArrow className="first:!fill-white" />
					<div className="flex rounded-xl border-t border-gray-100 bg-white py-3">
						<Form action="/auth/logout" method="post" className="w-full">
							<button
								name="redirectTo"
								value={location.pathname}
								className="w-full p-4 text-left text-lg leading-6 hover:bg-gray-100"
							>
								Log out @{user.username}
							</button>
						</Form>
					</div>
				</div>
			</AriaKit.Popover>
		</>
	)
}
