import Select, { components } from 'react-select'
import { UserAvatar } from '@components/ui/avatars'
import { classNames } from '@helpers/classNames'
import styles from './SingleContactSelect.module.scss'

export const SingleContactSelect = ({options}) => {
  const selectStyles = {
    control: ({isFocused}) => classNames({
      [styles.control]: true,
      [styles.focused]: isFocused
    }),
    indicatorSeparator: () => classNames({
      [styles.indicatorSeparator]: true
    }),
    dropdownIndicator: () => classNames({
      [styles.dropdownIndicator]: true
    }),
    menu: () => classNames({
      [styles.menu]: true
    }),
    menuList: () => classNames({
      [styles.menuList]: true
    }),
    option: ({isSelected, isFocused}) => classNames({
      [styles.option]: true,
      [styles.selected]: isSelected,
      [styles.focused]: isFocused
    }),
    noOptionsMessage: () => classNames({
      [styles.noOptionsMessage]: true
    })
  }

  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <UserAvatar name={props.data.contact.displayName} image={props.data.contact.avatar}/>
        <div className={styles.content}>
          <p className={styles.title}>{props.data.contact.displayName}</p>
          <p className={styles.email}>{props.data.contact.email}</p>
        </div>
      </components.Option>
    )
  }

  const EmptyState = () => {
    return (
      <div>
        <p className={styles.title}>Sorry :(</p>
        <p className={styles.note}>There is no user with this name or e-mail in your contacts</p>
      </div>
    )
  }

  return (
    <Select components={{Option: CustomOption}} options={options} classNames={selectStyles}
            placeholder={'Choose contact'} noOptionsMessage={() => EmptyState()}/>
  )
}
