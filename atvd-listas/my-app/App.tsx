import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';

import { groupByCategory, Section } from './helpers/groupByCategory';
import SectionHeader from './components/SectionHeader';
import MotorcycleItem from './components/MotorcycleItem';
import SectionFooter from './components/SectionFooter';

import rawData from "./mocks/motorcycles.json";

export default function App() {
  // Transforma o array plano em seções agrupadas por categoria, uma única vez
  const sections = useMemo(() => groupByCategory(rawData), []);

  // Pega a última seção para usar no workaround do bug do último footer
  const lastSection = sections[sections.length - 1];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor="#1E3A5F" />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item.model}-${item.brand}-${index}`}
        stickySectionHeadersEnabled
        renderItem={({ item }) => <MotorcycleItem motorcycle={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        // Workaround: o SectionList não renderiza o footer da ÚLTIMA seção.
        // Por isso, exibimos o footer de todas as seções EXCETO a última aqui...
        renderSectionFooter={({ section }: { section: Section }) =>
          section.title !== lastSection?.title
            ? <SectionFooter count={section.data.length} />
            : null
        }
        // ...e o footer da última seção é exibido aqui como substituto.
        ListFooterComponent={() => (
          <SectionFooter count={lastSection.data.length} />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
