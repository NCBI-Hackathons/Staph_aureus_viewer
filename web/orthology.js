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
      fdata: '',
      start: 0,
      search: '',
      end: 150,
      pages: '',
      currentPage: 1,
    }

  }

  componentDidMount() {
    Papa.parse("http://" + window.location.host + '/orth_table.csv', {
      download: true,
      complete: (results) => {
        this.setState({ fdata: results.data.slice(1), data: results.data, pages: Math.floor(results.data.length / 150) + 1 })
      }
    })
  }

  render() {

    if (this.state.fdata && this.state.pages) {
      return (
        <Table size='small' striped celled>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='60'>
                <Input placeholder='Search' value={this.state.search} style={{ marginRight: 15 }} onChange={(e) => {
                  this.setState({ search: e.target.value }, () => {
                    let fdata = this.state.data.slice(1).filter((row) => {
                      let pass = false
                      row.map((col) => {
                        if (col.includes(this.state.search)) pass = true
                      })
                      return pass
                    })
                    this.setState({
                      pages: Math.floor(fdata.length / 150) + 1,
                      fdata
                    })
                  })
                }} />
                <Menu pagination>
                  <Menu.Item onClick={() => { if (this.state.start >= 150) this.setState({ start: this.state.start - 150, end: this.state.end - 150 }) }} as='a' icon>
                    <Icon name='left chevron' />
                  </Menu.Item>
                  {[...Array(this.state.pages)].map((el, id3) => {
                    return <Menu.Item active={this.state.currentPage === (id3 + 1)} onClick={() => { this.setState({ currentPage: id3 + 1, start: id3 * 150, end: (id3 + 1) * 150 }) }} key={id3} as='a'>{id3 + 1}</Menu.Item>
                  })
                  }
                  <Menu.Item onClick={() => { this.setState({ start: this.state.start + 150, end: this.state.end + 150 }) }} as='a' icon>
                    <Icon name='right chevron' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Header>
            <Table.Row>
              {this.state.data[0].map((col, id0) => {
                return (
                  <Table.HeaderCell key={id0}>{col}</Table.HeaderCell>
                )
              })}
            </Table.Row>
          </Table.Header>


          <Table.Body>
            {
              this.state.fdata.map((row, id1) => {
                if (id1 >= this.state.start && id1 < this.state.end)
                  return (
                    <Table.Row key={id1}>
                      {row.map((col, id2) => {
                        return <Table.Cell key={id2}>{col}</Table.Cell>
                      })}
                    </Table.Row>
                  )
              })
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='60'>
                <Menu pagination>
                  <Menu.Item onClick={() => { if (this.state.start >= 150) this.setState({ start: this.state.start - 150, end: this.state.end - 150 }) }} as='a' icon>
                    <Icon name='left chevron' />
                  </Menu.Item>
                  {[...Array(this.state.pages)].map((el, id3) => {
                    return <Menu.Item active={this.state.currentPage === (id3 + 1)} onClick={() => { this.setState({ currentPage: id3 + 1, start: id3 * 150, end: (id3 + 1) * 150 }) }} key={id3} as='a'>{id3 + 1}</Menu.Item>
                  })
                  }
                  <Menu.Item onClick={() => { this.setState({ start: this.state.start + 150, end: this.state.end + 150 }) }} as='a' icon>
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