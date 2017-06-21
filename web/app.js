import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'
import request from 'request'
import Iframe from 'react-iframe'
import Orthology from './orthology'
import { Form, TextArea, Dropdown, Embed, Segment, Input, Container, Divider, Header, Button, Image, Menu } from 'semantic-ui-react'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 0,
      file: '',
      email: '',
      comment: '',
      param: window.location.href.split('#')[1],
      dropText: 'Drop your FASTA file here or click here to browse file.',
      jbrowseUrl: 'http://localhost:7777/jbrowse/?data=data%2FCP014407.1&tracklist=0'
    }
    this.onDrop = this.onDrop.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.onSend = this.onSend.bind(this)
  }

  componentDidMount() {
    if (this.state.param) {
      this.setState({ currentPage: 7 })
    }
  }

  onDrop(files) {
    this.setState({ file: files[0], dropText: 'File selected: ' + files[0].name.substring(0, 20) + ((files[0].name.length > 10) ? '...' : '') })
  }

  onSend() {
    request.get('http://localhost:3000/mail?comment=' + this.state.comment)
  }

  onContinue() {
    let fd = new FormData()
    fd.append("file", this.state.file)
    fd.append("email", this.state.email)
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3000/upload', true)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        let percentComplete = (e.loaded / e.total) * 100
        console.log(percentComplete + '% uploaded')
      }
    }
    xhr.onload = () => {
      if (xhr.status == 200) {
        console.log('Server got:', xhr.responseText)
        this.setState({ currentPage: 1 })
      }
    }
    xhr.send(fd)

  }

  showPage() {
    if (this.state.currentPage === 0) {
      return (
        <Container style={{ paddingTop: 10 }} text>
          <Header as='h2'>Annotate</Header>
          <p>This is a genome browser for Staphylococcus aureus.</p>

          <Segment>
            <p>Upload an assembled staph genome as a FASTA file:</p>
            <Dropzone accept='.fna,.fa,fasta' onDropRejected={() => { alert("File not accepted.") }} multiple={false} maxSize={10242880} onDropAccepted={this.onDrop}>
              <p style={{ marginTop: 55, marginLeft: 25, marginRight: 25 }}>{this.state.dropText}</p>
            </Dropzone>
          </Segment>

          <Segment>
            <p>You will receive a url link to your annotated genome.</p>
            <Input onChange={(event) => { this.setState({ email: event.target.value }) }} placeholder='Your Email' />
          </Segment>
          <Button onClick={this.onContinue} primary>Continue</Button>
        </Container>
      )
    } else if (this.state.currentPage === 1) {
      return (
        <Container text>
          <Header as='h2'>Submitted</Header>
          <p>You file is submitted and we'll send you an email when the processing is completed. You can close this page now.</p>
        </Container>
      )
    } else if (this.state.currentPage === 2) {
      return (
        <Container style={{ paddingTop: 10 }} >
          <Segment>
            <p>Choose a Staph strain to display:</p>
            <Dropdown onChange={(event, data) => {
              this.setState({
                jbrowseUrl: 'http://localhost:7777/jbrowse/?data=data%2F' + data.value
                + '&tracklist=0'
              })
            }} placeholder='select strain' selection options={[
              { key: "CP014407.1", value: "CP014407.1", text: "CP014407.1" },
              { key: "CP007499.1", value: "CP007499.1", text: "CP007499.1" },
              { key: "CP010295.1", value: "CP010295.1", text: "CP010295.1" },
              { key: "CP015646.1", value: "CP015646.1", text: "CP015646.1" },
              { key: "CP013619.1", value: "CP013619.1", text: "CP013619.1" },
              { key: "CP012979.1", value: "CP012979.1", text: "CP012979.1" },
              { key: "CP010998.1", value: "CP010998.1", text: "CP010998.1" },
              { key: "CP014438.1", value: "CP014438.1", text: "CP014438.1" },
              { key: "CP013959.1", value: "CP013959.1", text: "CP013959.1" },
              { key: "CP015173.1", value: "CP015173.1", text: "CP015173.1" },
              { key: "CP014402.1", value: "CP014402.1", text: "CP014402.1" },
              { key: "CP011685.1", value: "CP011685.1", text: "CP011685.1" },
              { key: "CP014432.1", value: "CP014432.1", text: "CP014432.1" },
              { key: "CP007676.1", value: "CP007676.1", text: "CP007676.1" },
              { key: "CP014435.1", value: "CP014435.1", text: "CP014435.1" },
              { key: "CP010296.1", value: "CP010296.1", text: "CP010296.1" },
              { key: "CP012972.1", value: "CP012972.1", text: "CP012972.1" },
              { key: "CP007539.1", value: "CP007539.1", text: "CP007539.1" },
              { key: "CP013182.1", value: "CP013182.1", text: "CP013182.1" },
              { key: "CP014409.1", value: "CP014409.1", text: "CP014409.1" },
              { key: "CP014429.1", value: "CP014429.1", text: "CP014429.1" },
              { key: "CP013955.1", value: "CP013955.1", text: "CP013955.1" },
              { key: "CP014420.1", value: "CP014420.1", text: "CP014420.1" },
              { key: "CP019563.1", value: "CP019563.1", text: "CP019563.1" },
              { key: "CP010299.1", value: "CP010299.1", text: "CP010299.1" },
              { key: "CP014415.1", value: "CP014415.1", text: "CP014415.1" },
              { key: "CP007674.1", value: "CP007674.1", text: "CP007674.1" },
              { key: "CP012593.1", value: "CP012593.1", text: "CP012593.1" },
              { key: "AP017320.1", value: "AP017320.1", text: "AP017320.1" },
              { key: "CP013616.1", value: "CP013616.1", text: "CP013616.1" },
              { key: "CP012970.1", value: "CP012970.1", text: "CP012970.1" },
              { key: "CP007447.1", value: "CP007447.1", text: "CP007447.1" },
              { key: "CP014444.1", value: "CP014444.1", text: "CP014444.1" },
              { key: "CP014064.1", value: "CP014064.1", text: "CP014064.1" },
              { key: "CP009828.1", value: "CP009828.1", text: "CP009828.1" },
              { key: "CP014423.1", value: "CP014423.1", text: "CP014423.1" },
              { key: "CP012976.1", value: "CP012976.1", text: "CP012976.1" },
              { key: "CP014441.1", value: "CP014441.1", text: "CP014441.1" },
              { key: "CP012692.1", value: "CP012692.1", text: "CP012692.1" },
              { key: "CP012974.1", value: "CP012974.1", text: "CP012974.1" },
              { key: "BX571857.1", value: "BX571857.1", text: "BX571857.1" },
              { key: "CP015645.1", value: "CP015645.1", text: "CP015645.1" },
              { key: "CP019117.1", value: "CP019117.1", text: "CP019117.1" },
              { key: "CP010298.1", value: "CP010298.1", text: "CP010298.1" },
              { key: "CP014397.1", value: "CP014397.1", text: "CP014397.1" },
              { key: "CP011528.1", value: "CP011528.1", text: "CP011528.1" },
              { key: "CP007672.1", value: "CP007672.1", text: "CP007672.1" },
              { key: "CP007670.1", value: "CP007670.1", text: "CP007670.1" },
              { key: "CP010297.1", value: "CP010297.1", text: "CP010297.1" },
              { key: "CP013137.1", value: "CP013137.1", text: "CP013137.1" },
              { key: "CP010890.1", value: "CP010890.1", text: "CP010890.1" },
              { key: "CP013953.1", value: "CP013953.1", text: "CP013953.1" },
              { key: "CP019945.1", value: "CP019945.1", text: "CP019945.1" },
              { key: "CP013957.1", value: "CP013957.1", text: "CP013957.1" },
              { key: "CP013132.1", value: "CP013132.1", text: "CP013132.1" },
              { key: "CP014791.1", value: "CP014791.1", text: "CP014791.1" },
              { key: "CP007657.1", value: "CP007657.1", text: "CP007657.1" },
              { key: "CP012978.1", value: "CP012978.1", text: "CP012978.1" },
              { key: "CP007690.1", value: "CP007690.1", text: "CP007690.1" },
              { key: "CP013621.1", value: "CP013621.1", text: "CP013621.1" },
              { key: "CP011147.1", value: "CP011147.1", text: "CP011147.1" },
              { key: "CP007454.1", value: "CP007454.1", text: "CP007454.1" },
              { key: "CP014412.1", value: "CP014412.1", text: "CP014412.1" },
              { key: "CP014392.1", value: "CP014392.1", text: "CP014392.1" },
              { key: "AP014942.1", value: "AP014942.1", text: "AP014942.1" },
              { key: "CP010300.1", value: "CP010300.1", text: "CP010300.1" },
            ]} />
          </Segment>
          <iframe style={{ border: 0, width: '100%', height: 400 }} src={this.state.jbrowseUrl}></iframe>
        </Container>
      )
    } else if (this.state.currentPage === 3) {
      return (
        <Container style={{ paddingTop: 10, width: '90%', overflow: 'scroll' }} >
          <Orthology />
        </Container>
      )
    } else if (this.state.currentPage === 4) {
      return (
        <Container style={{ paddingTop: 10 }} text>
          <Header as='h2'>Methods</Header>
          <p>Methods</p>
        </Container>
      )
    } else if (this.state.currentPage === 5) {
      return (
        <Container style={{ paddingTop: 10 }}>
          <Header as='h2'>Community</Header>
          <Iframe 
            position="absolute"
            width="80%"
            height="100%" 
            url='disqus.html' />
        </Container>
      )
    } else if (this.state.currentPage === 6) {
      return (
        <Container style={{ paddingTop: 10 }} text>
          <Header as='h2'>About</Header>
          <Image style={{ borderRadius: 5 }} src='images/about.jpg' />
          <Segment>
            <p>Richard Copin, Ph.D.</p>
            <p><a href="mailto:richard.copin@nyumc.org">richard.copin@nyumc.org</a></p>
            <p>New York University School of Medicine</p>
            <p>430 east 29th street,</p>
            <p>Alexandrai West, 3rd floor,</p>
            <p>New York, NY, 10016</p>
          </Segment>
          <Segment>
            <p>Anbo Zhou</p>
            <p><a href="mailto:zhouanbo@gmail.com">zhouanbo@gmail.com</a></p>
            <p>Genetics Department</p>
            <p>Rutgers University</p>
            <p>57 US Highway 1, New Brunswick, NJ, 08901</p>
          </Segment>
          <Segment>
            <p>Jeffrey Vedanayagam</p>
            <p><a href="mailto:vedanayj@mskcc.org">vedanayj@mskcc.org</a></p>
            <p>Developmental Biology Program</p>
            <p>Sloan Kettering Institute</p>
            <p>430 E 67th Street, New York 10065</p>
          </Segment>
          <Segment>
            <p>Dmitry Brogun</p>
            <p>City University of New York</p>
          </Segment>
          <Segment>
            <p>Stuart Brown</p>
            <p><a href="mailto:stuart.brown@nyumc.org">stuart.brown@nyumc.org</a></p>
            <p>Sequencing Informatics Group</p>
            <p>Center for Health Informatics and Bioinformatics</p>
            <p>New York University</p>
            <p>227 E 30th Street, New York 10016</p>
          </Segment>
          <Segment>
            <p>Ben Busby</p>
            <p>National Center for Biotechnology Information</p>
          </Segment>
        </Container>
      )
    } else if (this.state.currentPage === 7) {
      return (
        <Container style={{ paddingTop: 10 }} text>
          <Header as='h2'>Result</Header>
          <Image src={'jobs/' + this.state.param + '/result.png'} />
        </Container>
      )
    }
  }

  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <Container style={{ paddingTop: 15 }}>
          {/** Header **/}
          <div style={{ display: 'flex', height: 50 }}>
            <Image style={{ height: 50, width: 50 }} src='images/grapes.png' />
            <Header as='h2' style={{ marginTop: 12, marginLeft: 10 }}>StaphBrowse</Header>
          </div>
        </Container>

        {/** Menu **/}
        <Segment style={{ borderRadius: 0, paddingLeft: 150 }} inverted color='blue'>
          <Menu color='blue' inverted secondary>
            <Menu.Item name='Annotate' active={this.state.currentPage === 0} onClick={() => { this.setState({ currentPage: 0 }) }} />
            <Menu.Item name='JBrowse' active={this.state.currentPage === 2} onClick={() => { this.setState({ currentPage: 2 }) }} />
            <Menu.Item name='Orthology' active={this.state.currentPage === 3} onClick={() => { this.setState({ currentPage: 3 }) }} />
            <Menu.Item name='Methods' active={this.state.currentPage === 4} onClick={() => { this.setState({ currentPage: 4 }) }} />
            <Menu.Item name='Community' active={this.state.currentPage === 5} onClick={() => { this.setState({ currentPage: 5 }) }} />
            <Menu.Item name='About' active={this.state.currentPage === 6} onClick={() => { this.setState({ currentPage: 6 }) }} />
          </Menu>
        </Segment>

        <div>
          {/** Page **/}
          {this.showPage()}
        </div>

      </div>
    )
  }
}