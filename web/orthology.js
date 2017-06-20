import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'
import Papa from 'papaparse'
import { Menu, Icon, Dropdown, Segment, Input, Container, Divider, Header, Button, Table } from 'semantic-ui-react'

export default class Orthology extends React.Component {
  constructor() {
    super()
    this.state = {
      data: '',
    }

  }

  componentDidMount() {
    Papa.parse(new File([blob],'orth_table.csv'), {
      complete: (results) => {
        this.setState({ data: results })
      }
    })
  }

  render() {
    console.log(this.state.data)
    if (this.state.data) {
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
            </Table.Row>
          </Table.Header>


          <Table.Body>
            {
              this.state.data.map((row, id) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell>{row[0]}</Table.Cell>
                    <Table.Cell>{row[1]}</Table.Cell>
                    <Table.Cell>{row[2]}</Table.Cell>
                  </Table.Row>
                )
              })
            }
            <Table.Row>
              <Table.Cell>
                First
              </Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='left chevron' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='right chevron' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      )
    } else {
      return null
    }

  }

}